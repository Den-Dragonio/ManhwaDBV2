// ============================================================
// services/email.js — EmailJS Integration
// ============================================================
// HOW TO USE:
// 1. Register at https://www.emailjs.com/ (Free plan available)
// 2. Create an Email Service (e.g., Gmail)
// 3. Create an Email Template with placeholders: 
//    {{to_name}}, {{commenter_name}}, {{review_title}}, {{message}}, {{review_url}}, {{to_email}}
// 4. Copy your keys and replace the placeholders below.
// ============================================================

export const EmailService = {
  // CONFIG: Replace these with your real keys from EmailJS Dashboard
  config: {
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },

  /**
   * Sends an email notification about a new comment/reply
   * @param {Object} params - The template parameters
   */
  async send(params) {
    if (this.config.publicKey === 'YOUR_PUBLIC_KEY') {
      console.log('📧 EmailJS not configured. Skipping email.');
      return;
    }

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: this.config.serviceID,
          template_id: this.config.templateID,
          user_id: this.config.publicKey,
          template_params: params
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`EmailJS failed: ${errText}`);
      }

      console.log('✅ Email notification sent successfully');
      return true;
    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      return false;
    }
  },

  /**
   * Helper to send notification to a user
   */
  async notifyNewInteraction({ 
    toEmail, 
    toName, 
    commenterName, 
    reviewTitle, 
    reviewId, 
    message, 
    type = 'comment' 
  }) {
    if (!toEmail) return;

    const reviewUrl = `${window.location.origin}/#review/${reviewId}`;
    
    return this.send({
      to_email: toEmail,
      to_name: toName || 'Користувач',
      commenter_name: commenterName,
      review_title: reviewTitle,
      review_url: reviewUrl,
      message: message,
      interaction_type: type === 'comment' ? 'прокоментував вашу рецензію' : 'відповів на ваш коментар'
    });
  }
};
