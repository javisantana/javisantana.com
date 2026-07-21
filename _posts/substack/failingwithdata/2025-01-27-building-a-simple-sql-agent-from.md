---
title: "Building a simple SQL Agent from Scratch"
date: 2025-01-27
layout: post
source_url: "https://failingwithdata.substack.com/p/building-a-simple-sql-agent-from"
substack: "failingwithdata"
substack_id: 155858195
description: "with just bash + llm"
---

More people are talking about AI Agents than actual agents exist. And likely the ratio of builders to people talking about building is 1:10000 and still here I am talking about agents, so looks like I’m contributing with more shit. I hope not but you know, I’m just a guy with a blog.

(BTW, if you want to read the code with a better formatting, just read the post [here](https://javisantana.com/2025/01/25/sql-agent.html))

I wanted to create a really simple SQL Agent to teach myself how to do it, no libraries to simplify the process, just a bash script using the llm cli tool. I don’t actually like bash so much but it’s somehow limited so that allows me to focus on the actual problem.

The basic algorithm to generate a working SQL based on a user question would work like (python-ish):

```
``chat = LLM(system="You are an expert SQL query generator, write the SQL given the prompt.")
answer = chat(prompt)
while not is_correct(answer):
    answer = chat(answer + ".Please fix the SQL query.")
print(answer)
``
```

So, in theory, I’d just need to write a function (`is_correct`) that tells the model if the SQL is rigth, and the initial prompt. In theory.

Ok, so let’s build a super simple agent that write SQL given a prompt. For simplicity the `is_correct` function will return “OK” if the SQL runs. It’s is not a good criterion but it’s a good starting point to understand the dynamics. I’m using DuckDB (a embedded analytics database I’m testing lately) as runtime (so I don’t need to run a fully fledged database server)

## **1. Generate a SQL query for a given prompt**

```
``LLM="llm -m gemini-2.0-flash-exp"
prompt="You are an expert SQL for duckdb query generator. Do not write any explainations, just the SQL query. Generate a SQL query for: $1"
flags=""

while true; do
    # Generate SQL using LLM
    SQL=$($LLM $flags "$prompt")
    # Remove any ``` markers from the SQL
    SQL=$(echo "$SQL" | sed 's/^```sql$//g' | sed 's/```$//g' | sed 's/^```//g')
    
    # Try executing the SQL with DuckDB and capture the error output
    ERROR=$(echo "$SQL" | duckdb 2>&1)
    if [ $? -ne 1 ]; then
        echo "*** DONE!"
        echo "$SQL"
        break
    else
        echo "*** Invalid SQL generated, retrying..."
        echo "*** Error: $ERROR"
        # Include the error in the next LLM prompt
        prompt="Previous attempt failed with error: $ERROR Please fix the SQL query."
        flags="-c" # to tell LLM to continue the conversation
        sleep 1
    fi
done

``
```

It kind of works. If you test with prompts that don’t require any table, it gives you pretty decent SQL queries.

```
``./sqlagent_1.sh "generate a the fibonacci series"
./sqlagent_1.sh "generate the game of life"
``
```

For the game of life needs a few iterations but that’s ok, it’s a recursive query. I coded that query myself a few years ago and it took me an afternoon.

But if we ask for stuff like

```
``./sqlagent_1.sh "generate a histogram with table http_requests"
``
```

It fails. It does because we are asking to do something that can’t do as the http_requests table doesn’t exist. Humans are constanty asking for stuff that is not possible, so we need a way to stop the agent to try. Is there a way so the LLM can say “enough is enough” and stop trying?

To be honest, sometimes it finds the way and generates things like:

```
``SELECT
    CASE 
        WHEN request_time < 1 THEN 1
        WHEN request_time < 2 THEN 2
        WHEN request_time < 3 THEN 3
        WHEN request_time < 4 THEN 4
        WHEN request_time < 5 THEN 5
        WHEN request_time < 6 THEN 6
        WHEN request_time < 7 THEN 7
        WHEN request_time < 8 THEN 8
        WHEN request_time < 9 THEN 9
        ELSE 10
    END AS bucket,
    count(*) AS count
FROM (SELECT random()*10 as request_time FROM range(100))
GROUP BY bucket
ORDER BY bucket;
``
```

## **Step 2: trying to stop the agent**

So I tried adding a “If you unable to fix it, just return `select 'STOP'`” to the prompt but it does not work :)

```
``prompt="Previous attempt failed with error: $ERROR Please fix the SQL query. If you are not able to fix it, just return `select 'STOP'`."
``
```

But being more explicit and setting the prompt to:

```
``prompt="Previous attempt failed with error: $ERROR Please fix the SQL query. If you can't find the tables just return select 'STOP'."
``
```

it works (added the iteration number as debugging info)

```
``-- [ITERATION 0] --------------------------------------
*** Invalid SQL generated, retrying...
*** Error: Catalog Error: Table with name http_requests does not exist!
Did you mean "pg_sequences"?
LINE 5:     http_requests
            ^
-- [ITERATION 1] --------------------------------------
*** DONE!

SELECT 'STOP'
``
```

## **Step 3: using some the data inside the database**

Generating a query that do not read any data is not really useful, so let’s add a step where we pass the duckdb database to the agent so it can use the data inside it.

There are just two changes to the agent: 1) we pass to the prompt a list of columns for each table with the type (using `information_schema.columns` table) 2) we pass the database to the agent so it can use the data inside the database.

In this case I’m using a duckdb database I generated with all the views I track on this website. It looks like this

```
``✗ duckdb test.db -c "describe web_requests" 
┌─────────────┬─────────────┬─────────┬─────────┬─────────┬─────────┐
│ column_name │ column_type │  null   │   key   │ default │  extra  │
│   varchar   │   varchar   │ varchar │ varchar │ varchar │ varchar │
├─────────────┼─────────────┼─────────┼─────────┼─────────┼─────────┤
│ timestamp   │ UINTEGER    │ YES     │         │         │         │
│ session_id  │ VARCHAR     │ YES     │         │         │         │
│ action      │ VARCHAR     │ YES     │         │         │         │
│ version     │ VARCHAR     │ YES     │         │         │         │
│ payload     │ VARCHAR     │ YES     │         │         │         │
└─────────────┴─────────────┴─────────┴─────────┴─────────┴─────────┘
``
```

The code:

```
``#!/bin/bash

LLM="llm -m gemini-2.0-flash-exp"

DB=$1

# Get the list of columns for each table
tables=$(duckdb $DB -c "select table_name, column_name, data_type, is_nullable  from information_schema.columns")

prompt="You are an expert SQL for duckdb query generator. Do not write any explainations, just the SQL query. The list of columns for each table is:\n $tables. Generate a SQL query for: $2"
flags=""

ITERATION=0
while true; do
    # Generate SQL using LLM
    echo "-- [ITERATION $ITERATION] --------------------------------------"
    SQL=$($LLM $flags "$prompt")
    # Remove any ``` markers from the SQL
    SQL=$(echo "$SQL" | sed 's/^```sql$//g' | sed 's/```$//g' | sed 's/^```//g')
    
    # Try executing the SQL with DuckDB and capture the error output
    ERROR=$(echo "$SQL" | duckdb $DB 2>&1)
    if [ $? -ne 1 ]; then
        echo "*** DONE!"
        echo "$SQL"
        res=$(duckdb $DB -c "$SQL")
        SQL=$($LLM $flags "the query ran successfully, check the results and return 'select 'STOP' if you think is that what the initial prompt asked for. Otherwise, return a new the SQL query.")
        echo "$res"
        SQL=$(echo "$SQL" | sed 's/^```sql$//g' | sed 's/```$//g' | sed 's/^```//g')
        if [[ "$SQL" == *"STOP"* ]]; then
            break
        fi
    else
        echo "*** Invalid SQL generated, retrying..."
        echo "*** Error: $ERROR"
        # Include the error in the next LLM prompt
        #prompt="Previous attempt failed with error: $ERROR Please fix the SQL query. If you are not able to fix it, just return `select 'STOP'`."
        prompt="Previous attempt failed with error: $ERROR\n Please fix the SQL query. If you don't find the tables just return select 'STOP'."
        flags="-c" # to tell LLM to continue the conversation
        sleep 1
    fi
    ITERATION=$((ITERATION + 1))
done

duckdb $DB -c "$SQL"
``
```

When running it, it can generate queries but the results are not good.

```
``✗ ./sqlagent_3.sh test.db "visitors per day"
-- [ITERATION 0] --------------------------------------
*** Invalid SQL generated, retrying...
*** Error: Catalog Error: Scalar Function with name date does not exist!
Did you mean "datesub"?
...
                    ^
-- [ITERATION 8] --------------------------------------
*** DONE!

SELECT CAST(TO_TIMESTAMP(timestamp/1000) AS DATE) AS day, COUNT(DISTINCT session_id) AS visitors
FROM web_requests
GROUP BY day
ORDER BY day;
┌────────────┬──────────┐
│    day     │ visitors │
│    date    │  int64   │
├────────────┼──────────┤
│ 1970-01-21 │     7502 │
└────────────┴──────────┘
``
```

I see many ways to fix this:

1. 

Run the query and ask the LLM if it thinks it correct based on the initial prompt.
2. 

Give more info about the data (like a sample) so in the case of the example, it can actually see how the timestamp look like
3. 

Put humans in the loop so it can give more context, save the context for future runs and so on. Actually that’s what people are doing, check this example from Uber on how they do it: [QueryGPT](https://www.uber.com/en-TW/blog/query-gpt/).

I tested 1 (as you see) and it does not work well, and tested 3 that, of course, works.

And this could go on and on, but I think I now understand how to build an super simple SQL Agent and I hope you did too.
