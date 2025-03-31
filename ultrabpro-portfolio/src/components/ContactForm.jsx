import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null }
    });

    try {
      // Replace these with your actual Email.js service, template, and user IDs
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: "VICTORY! Your message has been sent successfully!" }
      });
      
      // Reset form after successful submission
      setFormData({
        user_name: '',
        user_email: '',
        message: ''
      });
      
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "DEFEAT! An error occurred. Please try again later." }
      });
      console.error(error);
    }
  };

  return (
    <div className="contact-form">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>YOUR NAME</label>
          <input 
            type="text" 
            name="user_name" // Email.js template parameter
            value={formData.user_name}
            onChange={handleChange}
            placeholder="ENTER YOUR NAME" 
            required
          />
        </div>
        <div className="form-group">
          <label>YOUR EMAIL</label>
          <input 
            type="email" 
            name="user_email" // Email.js template parameter
            value={formData.user_email}
            onChange={handleChange}
            placeholder="ENTER YOUR EMAIL" 
            required
          />
        </div>
        <div className="form-group">
          <label>YOUR MESSAGE</label>
          <textarea 
            name="message" // Email.js template parameter
            value={formData.message}
            onChange={handleChange}
            placeholder="TYPE YOUR MESSAGE HERE"
            required
          ></textarea>
        </div>
        <button 
          className="fight-button" 
          type="submit"
          disabled={status.submitting}
        >
          {status.submitting ? 'SENDING...' : 'FIGHT! (SEND MESSAGE)'}
        </button>
        
        {status.info.msg && (
          <div className={`form-status ${status.info.error ? 'error' : 'success'}`}>
            {status.info.msg}
          </div>
        )}
      </form>
      
      <div className="contact-info">
        <div className="contact-item">
          <span className="contact-label">EMAIL:</span>
          <span className="contact-value">b3bpro123@gmail.com</span>
        </div>
        <div className="contact-item">
          <span className="contact-label">PHONE:</span>
          <span className="contact-value">+84 762 762 892</span>
        </div>
        <div className="contact-item">
          <span className="contact-label">LOCATION:</span>
          <span className="contact-value">Da Nang, Vietnam</span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 