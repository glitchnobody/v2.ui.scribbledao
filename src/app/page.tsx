"use client";
import Image from "next/image";
import styles from "./loginSignup.module.scss";
import Logo from "./Logo";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.login_signup_background}>
      <div className={styles.auth_card_container}>
        <div className={styles.auth_card}>
          <div className={styles.top_bar}>
            <div className={styles.logo_container}>
              <div>
                <Logo />
              </div>
              <span>Scribble Dao</span>
            </div>
            <button className="button_large button_lime">Login</button>
          </div>
          <div className={styles.middle_pannel}></div>
          <div className={styles.bottom_bar}>
            <Link href="https://t.me/scribbledao" target="_blank">
              <button className="button_large button_lime">
                Join Community
              </button>
            </Link>
            <Link href="https://cal.com/alyasa-haider/30min" target="_blank">
              <button className="button_large button_lime">
                Submit a grant
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
