"use client";

import React, { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "@/styles/auth.module.scss";
import Link from "next/link";
import gsap from "gsap";

const Page = () => {
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const session = useSession();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    title: "PARENT",
  });

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5 }
    );
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        const res = await fetch("http://localhost:8080/api/v1/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            roles: [{ id: formData.title === "PARENT" ? 1 : 2, title: formData.title }],
            userStatus: "ACTIVE",
            createdAt: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Ошибка регистрации");
        }

        setIsVerification(true);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      setError("");

      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          verificationCode, 
        }),
      });
  
      if (!res.ok) {
        throw new Error("Неверный код подтверждения");
      }
  
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div
      className={classes.authBg}
      style={{
        background: "url('/bg_auth.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={classes.auth}>
        <div
          className={classes.bg_auth}
          style={{
            background: "url('/bg_auth.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>

        <div className={classes.form} ref={formRef}>
          {isVerification ? (
            <>
              <h2>Email confrim</h2>
              <p>Enter the 6-digit code sent to {formData.email}</p>
              <form onSubmit={handleVerify}>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </>
          ) : (
            <>
              <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
              <p>{isSignUp ? "Enter your details to sign up" : "Enter your email and password to access your account"}</p>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleSubmit}>
                {isSignUp ? (
                  <>
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label>Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <label>Select your role</label>
                    <select
                      className={classes.selectRole}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    >
                      <option value="PARENT">Parent</option>
                      <option value="EMPLOYEE">Employee</option>
                    </select>
                    <label>Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label>Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </>
                )}
                <div className={classes.check}>
                  <div>
                    <input type="checkbox" id="check" />
                    <label htmlFor="check">Remember me</label>
                  </div>
                  <Link href="" style={{ fontSize: "13px", textDecoration: "none", color: "#4C4C4C" }}>
                    Forgot Password
                  </Link>
                </div>
                <button type="submit">{isSignUp ? "Sign up" : "Sign in"}</button>
              </form>
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={{ fontSize: "13px", textDecoration: "none", color: "#4C4C4C", cursor: "pointer" }}
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;