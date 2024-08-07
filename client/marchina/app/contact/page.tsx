import React from 'react';
import styles from './page.module.css'; // Assuming the CSS file is in the same directory

const Contact: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbItem}>Home</div>
        <div className={styles.breadcrumbSeparator}>/</div>
        <div className={styles.breadcrumbItemActive}>Contact</div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.contactInfo}>
          <div className={styles.contactInfoSection}>
            <div className={styles.contactIconContainer}>
              <div className={styles.contactIcon}>
                <img src="/path-to-phone-icon.png" alt="" />
              </div>
              <div className={styles.contactTitle}>📞 Call To Us</div>
            </div>
            <div className={styles.contactText}>We are available 24/7, 7 days a week.</div>
            <div className={styles.contactDetails}>Phone: +8801611112222</div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.contactInfoSection}>
            <div className={styles.contactIconContainer}>
              <div className={styles.contactIcon}>
                <img src="/path-to-email-icon.png" alt="" />
              </div>
              <div className={styles.contactTitle}>✉️ Write To Us</div>
            </div>
            <div className={styles.contactText}>Fill out our form and we will contact you within 24 hours.</div>
            <div className={styles.contactDetails}>Emails: customer@exclusive.com</div>
            <div className={styles.contactDetails}>Emails: support@exclusive.com</div>
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Your Name *" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Your Email *" className={styles.input} />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Your Subject *" className={styles.input} />
            </div>
          </div>
          <div className={styles.textAreaGroup}>
            <textarea placeholder="Your Message" className={styles.textArea}></textarea>
          </div>
          <button className={styles.submitButton}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
