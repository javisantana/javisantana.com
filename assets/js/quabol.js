
$(document).ready(function() {

   $("#products_extend").hide()
   $("#products_more").click(function() {
        $("#main").hide("slow")
        $(".description").hide("slow")
        $("#products_extend").show("slow")
        
    }); 
});

