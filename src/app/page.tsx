"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./loginSignup.module.css";
import Logo from "./Logo";
import Link from "next/link";
import BookletBody from "@/components/ui/BookletBody";
import { Icon } from "@iconify/react";
import SignupFlow from "@/components/auth/SignupFlow";
import LoginFlow from "@/components/auth/LoginFlow";

export default function Home() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);

  // Redirect to login/signup pages instead of toggling
  const handleFlowSwitch = () => {
    setIsSignup(!isSignup);
  };

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
            <button
              onClick={handleFlowSwitch}
              className={` ${styles.flow_switch_button} button_large button_lime `}
            >
              {isSignup ? "Login" : "Signup"}
            </button>
          </div>
          <div className={styles.middle_panel}>
            <div className={`${styles.flow_switch_container}`}>
              <button
                onClick={() => setIsSignup(true)}
                className={isSignup ? "" : styles.inactive}
              >
                Signup
              </button>
              <button
                onClick={() => setIsSignup(false)}
                className={isSignup ? styles.inactive : ""}
              >
                Login
              </button>
            </div>
            <BookletBody
              holeColor="var(--purple-950)"
              ringColor="var(--stone-950)"
            >
              {isSignup ? <SignupFlow /> : <LoginFlow />}
            </BookletBody>
          </div>
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
