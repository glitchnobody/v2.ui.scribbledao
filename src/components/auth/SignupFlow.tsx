"use client";
import { useState, useEffect } from "react";
import styles from "./auth.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import {
  signUpWithEmail,
  verifyOtpSignup,
  clearError,
} from "@/lib/redux/features/userSlice";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function zASignupFlow() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  const [flowStage, setFlowStage] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [usernameUnique, setUsernameUnique] = useState<"loading" | boolean>(
    "loading"
  );
  const [usernameLength, setUsernameLength] = useState(false);
  const [usernameLetters, setUsernameLetters] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [isTOS, setIsTOS] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [isNewsletter, setIsNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Clear any errors when component mounts or unmounts
  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Check username uniqueness with debounce
  useEffect(() => {
    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Reset to loading state when user types
    if (username.length > 3) {
      setUsernameUnique("loading");
      // Set a new timeout
      const timeout = setTimeout(async () => {
        if (username.length > 3 && /^[a-zA-Z0-9]+$/.test(username)) {
          try {
            const { data, error } = await supabase
              .from("profile")
              .select("username")
              .eq("username", username)
              .single();

            // If data exists, username is taken
            setUsernameUnique(data ? false : true);
          } catch (error) {
            // If error code is PGRST116, it means no rows found, so username is available
            if ((error as { code: string }).code === "PGRST116") {
              setUsernameUnique(true);
            } else {
              console.error("Error checking username:", error);
              setUsernameUnique(false);
            }
          }
        }
      }, 500); // 500ms debounce

      setTypingTimeout(timeout);
    } else {
      setUsernameUnique(false);
    }

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [username]);

  // Validate username
  useEffect(() => {
    if (username.length > 3) {
      setUsernameLength(true);
      if (/^[a-zA-Z0-9]+$/.test(username)) {
        setUsernameLetters(true);
      } else {
        setUsernameLetters(false);
      }
    } else {
      setUsernameLength(false);
      setUsernameLetters(false);
    }
  }, [username]);

  // Validate email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Handle username submission
  const handleUsernameSubmit = () => {
    if (usernameLength && usernameLetters && usernameUnique === true) {
      setFlowStage(1);
    }
  };

  // Add countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && flowStage === 2) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, flowStage]);

  // Handle email submission
  const handleEmailSubmit = async () => {
    if (!isTOS || !isPrivacy) {
      setErrorMessage("Please accept the terms of service and privacy policy.");
      return;
    }

    if (emailValid) {
      try {
        await dispatch(signUpWithEmail({ email, username })).unwrap();
        setFlowStage(2);
        setCountdown(60); // Start 60 second countdown
        setCanResend(false);
      } catch (err) {
        console.error("Signup error:", err);
        setErrorMessage("An error occurred during signup.");
      }
    }
  };

  // Add resend code function
  const handleResendCode = async () => {
    if (!canResend || isLoading) return;

    try {
      setErrorMessage("");
      await dispatch(signUpWithEmail({ email, username })).unwrap();
      // Reset countdown
      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      console.error("Resend error:", err);
      setErrorMessage("Failed to resend verification code.");
    }
  };

  // Handle OTP verification
  const handleVerifyOtpSignup = async () => {
    // Remove hyphen before verification
    const cleanOtp = otp.replace("-", "");

    if (cleanOtp.length >= 6) {
      try {
        await dispatch(
          verifyOtpSignup({ email, otp: cleanOtp, username })
        ).unwrap();
        router.push("/dashboard");
      } catch (err) {
        console.error("Verification error:", err);
      }
    }
  };

  // Username selection stage
  if (flowStage === 0) {
    return (
      <div className={styles.signup_flow_container}>
        <div className={styles.top_heading}>
          <span>Welcome to the party</span>
          <h1>
            Create <br /> New Account
          </h1>
        </div>
        <div className={styles.username_input_section}>
          <label htmlFor="username">
            Let&apos;s start with a cool username
          </label>
          <div>
            <input
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              maxLength={15}
              type="text"
              placeholder="Enter username"
              id="username"
              value={username}
            />
            <span>.fren</span>
          </div>
          <ul>
            <li className={usernameUnique === true ? styles.success : ""}>
              {usernameUnique === "loading" ? (
                <Icon icon="line-md:loading-twotone-loop" />
              ) : usernameUnique === true ? (
                <Icon icon="hugeicons:stars" />
              ) : (
                <Icon icon="ic:round-minus" />
              )}
              Unique Name
            </li>
            <li className={usernameLength ? styles.success : ""}>
              {usernameLength ? (
                <Icon icon="ant-design:smile-outlined" />
              ) : (
                <Icon icon="ic:round-minus" />
              )}
              4-15 Character Long
            </li>
            <li className={usernameLetters ? styles.success : ""}>
              {usernameLetters ? (
                <Icon icon="mdi:check-all" />
              ) : (
                <Icon icon="ic:round-minus" />
              )}
              Only Letters and Numbers
            </li>
          </ul>
        </div>
        <div className={styles.button_section}>
          <button
            className="button_large button_black"
            onClick={handleUsernameSubmit}
            disabled={
              !usernameLength ||
              !usernameLetters ||
              usernameUnique !== true ||
              isLoading
            }
          >
            {isLoading ? "Processing..." : "Let's go"}
          </button>

          <span>
            Want to know what scribble dao is about <br />
            <Link href="/about"> learn more here</Link>
          </span>
        </div>
      </div>
    );
  }

  // Email input stage
  if (flowStage === 1) {
    return (
      <div className={styles.signup_flow_container}>
        <div className={styles.top_heading}>
          <span>Welcome to the party</span>
          <h1>
            We need your <br /> email
          </h1>
        </div>
        <div className={styles.email_input_section}>
          <label className={styles.email_input_label} htmlFor="email">
            Don't worry we wont send any spam
          </label>
          <input
            className={styles.email_input}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your@email.com"
            id="email"
            value={email}
          />
          <ul>
            <li
              onClick={() => {
                setIsTOS(!isTOS);
                setErrorMessage("");
              }}
              className={isTOS ? styles.success : ""}
            >
              {isTOS ? (
                <Icon icon="material-symbols:check-box-rounded" />
              ) : (
                <Icon icon="hugeicons:stop" />
              )}
              I accept terms of service
            </li>
            <li
              onClick={() => {
                setIsPrivacy(!isPrivacy);
                setErrorMessage("");
              }}
              className={isPrivacy ? styles.success : ""}
            >
              {isPrivacy ? (
                <Icon icon="material-symbols:check-box-rounded" />
              ) : (
                <Icon icon="hugeicons:stop" />
              )}
              I accept privacy policy
            </li>
            <li
              onClick={() => setIsNewsletter(!isNewsletter)}
              style={{ marginTop: "10px" }}
              className={isNewsletter ? styles.success_black : ""}
            >
              {isNewsletter ? (
                <Icon icon="material-symbols:check-box-rounded" />
              ) : (
                <Icon icon="hugeicons:stop" />
              )}
              Send me newsletter
            </li>
          </ul>
        </div>
        <div className={styles.button_section}>
          <button
            className="button_large button_black"
            onClick={handleEmailSubmit}
            disabled={!emailValid || isLoading}
          >
            {isLoading ? "Sending..." : "Send verification code"}
          </button>
          {errorMessage.length > 0 && (
            <span className={styles.error_text}>{errorMessage}</span>
          )}
          <span className={styles.button_text} onClick={() => setFlowStage(0)}>
            Back to username
          </span>
        </div>
      </div>
    );
  }

  // OTP verification stage
  return (
    <div className={styles.signup_flow_container}>
      <div className={styles.top_heading}>
        <span>Final step</span>
        <h1>
          Verify your <br /> Email
        </h1>
      </div>
      <div className={styles.otp_input_section}>
        <label htmlFor="otp">Enter the code sent to your email</label>

        <input
          className={styles.otp_input}
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
          maxLength={7} // Increased to 7 to account for the hyphen
        />
      </div>
      <div className={styles.button_section}>
        <button
          className="button_large button_black"
          onClick={handleVerifyOtpSignup}
          disabled={otp.length < 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Create Account"}
        </button>
        <span className={styles.error_text}>{errorMessage}</span>
        <button
          className={styles.button_text}
          onClick={handleResendCode}
          disabled={!canResend || isLoading}
          style={{
            color: "var(--purple-950)",
            cursor: canResend ? "pointer" : "cursor",
          }}
        >
          Resend code
          {!canResend && countdown > 0 && <span> in {countdown} seconds</span>}
        </button>

        <button
          className={styles.button_text}
          onClick={() => setFlowStage(1)}
          disabled={isLoading}
        >
          Back to email
        </button>
      </div>
    </div>
  );
}
