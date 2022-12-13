import styles from './styles/legal-links-footer.module.css';

export function LegalLinksFooter() {
  return (
    <div>
      <span className={`${styles.link}`}>
        <a
          href="https://www.blindnet.io/legal/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
          <svg
            className={styles.icon}
            width="8"
            height="8"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </a>
      </span>
      <span className={`${styles.link}`}>
        <a
          href="https://www.blindnet.io/legal/legal-mentions"
          target="_blank"
          rel="noreferrer"
        >
          Legal Mentions
          <svg
            className={styles.icon}
            width="8"
            height="8"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </a>
      </span>
      <span className={`${styles.link}`}>
        <a
          href="https://www.blindnet.io/legal/terms-and-conditions"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions
          <svg
            className={styles.icon}
            width="8"
            height="8"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </a>
      </span>
    </div>
  );
}

export default LegalLinksFooter;
