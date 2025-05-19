"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";
import Link from "next/link";
import BookletBody from "@/components/ui/BookletBody";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import {
  signInWithEmail,
  verifyOtpLogin,
  clearError,
} from "@/lib/redux/features/userSlice";

export default function LoginFlow() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [flowStage, setFlowStage] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  // Clear any errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Validate email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Handle email submission
  const handleEmailSubmit = async () => {
    if (emailValid) {
      try {
        await dispatch(signInWithEmail(email)).unwrap();
        setFlowStage(1);
      } catch (err) {
        console.error("Login error:", err);
      }
    }
  };

  // Handle OTP verification
  const handleVerifyOtpLogin = async () => {
    const cleanOtp = otp.replace("-", "");

    if (cleanOtp.length >= 6) {
      try {
        await dispatch(verifyOtpLogin({ email, otp: cleanOtp })).unwrap();
        router.push("/dashboard");
      } catch (err) {
        console.error("Verification error:", err);
      }
    }
  };

  // Email input stage
  if (flowStage === 0) {
    return (
      <div className={styles.signup_flow_container}>
        <div className={styles.top_heading}>
          <span>Welcome back</span>
          <h1>
            Login to Your
            <br /> Account
          </h1>
        </div>
        <div className={styles.email_input_section}>
          <label htmlFor="email">Enter your email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your@email.com"
            id="email"
            value={email}
          />
        </div>
        <div className={styles.button_section}>
          <button
            className="button_large button_black"
            onClick={handleEmailSubmit}
            disabled={!emailValid || isLoading}
          >
            {isLoading ? "Sending..." : "Send login code"}
          </button>
          {error && <p className={styles.error_text}>{error}</p>}
          <span>
            Want to know what scribble dao is about
            <Link href="/about"> learn more here</Link>
          </span>
          <span>
            Forgot your email
            <Link href="/about"> ,Get help</Link>
          </span>
        </div>
      </div>
    );
  }

  // OTP verification stage
  return (
    <div className={styles.signup_flow_container}>
      <div className={styles.top_heading}>
        <span>Almost there</span>
        <h1>
          Verify your <br /> Email
        </h1>
      </div>
      <div className={styles.otp_input_section}>
        <label htmlFor="otp">Enter the code sent your email</label>
        <input
          style={{
            textAlign: "center",
          }}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digits
            if (value.length <= 6) {
              // Format with hyphen after first 3 digits
              if (value.length > 3) {
                setOtp(value.slice(0, 3) + "-" + value.slice(3));
              } else {
                setOtp(value);
              }
            }
          }}
          type="text"
          placeholder="000-000"
          id="otp"
          value={otp}
          maxLength={6}
        />
      </div>
      <div className={styles.button_section}>
        <button
          className="button_large button_black"
          onClick={handleVerifyOtpLogin}
          disabled={otp.length < 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Login"}
        </button>
        {error && <p className={styles.error_text}>{error}</p>}
        <button
          className={styles.button_text}
          onClick={() => setFlowStage(0)}
          disabled={isLoading}
        >
          Back to email
        </button>
      </div>
    </div>
  );
}
