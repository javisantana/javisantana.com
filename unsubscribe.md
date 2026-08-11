---
layout: base_data
---
<div class="container">
  <div class="entry">
    <h1><a href="/">≗</a> Unsubscribe</h1>
    
    <div id="unsubscribe-form" class="entry space" style="text-align: center; margin-top: 2em;">
      <h2>Unsubscribe from updates</h2>
      <form onsubmit="handleUnsubscribe(event)" style="margin: 2em 0; display: flex; flex-direction: column; align-items: center; gap: 1em;">
        <input 
          type="email" 
          id="email" 
          placeholder="Enter your email"
          style="padding: 8px 12px; font-size: 16px; width: 300px;"
          required
        >
        <textarea
          id="reason"
          placeholder="Why are you unsubscribing? (optional)" 
          style="padding: 8px 12px; font-size: 13px; width: 300px; height: 60px; resize: vertical;"
        ></textarea>
        <button 
          type="submit"
          style="padding: 8px 16px; font-size: 16px; background: #ff9f71; border: none; color: #1a1a1a; cursor: pointer; width: 300px;"
        >
          Unsubscribe
        </button>
      </form>
      <div id="unsubscribe-message" style="display: none; margin-top: 1em;"></div>
    </div>
  </div>

  <script>
    async function handleUnsubscribe(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('email');
      const reasonInput = document.getElementById('reason');
      const messageDiv = document.getElementById('unsubscribe-message');
      const email = emailInput.value.trim();
      const reason = reasonInput.value.trim();

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        messageDiv.style.display = 'block';
        messageDiv.style.color = '#ff4444';
        messageDiv.textContent = 'Please enter a valid email address';
        return;
      }

      // The newsletters live on Substack — the real unsubscribe link is at the
      // bottom of every email. This form no longer sends anywhere; point people
      // to a channel that actually removes them.
      const subject = encodeURIComponent('Unsubscribe');
      const body = encodeURIComponent('Please unsubscribe ' + email + (reason ? ('\n\nReason: ' + reason) : ''));
      messageDiv.style.display = 'block';
      messageDiv.style.color = '#4CAF50';
      messageDiv.innerHTML = "Use the unsubscribe link at the bottom of any newsletter email, " +
        'or <a href="mailto:javi@tinybird.co?subject=' + subject + '&body=' + body + '">email me</a> and I\'ll remove you.';
    }
  </script>

  <div class="entry more close"><a href="/">≗</a></div>
</div>