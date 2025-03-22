"use client";

import React, { useState } from "react";
import {signIn, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "@/styles/auth.module.scss";
import Link from "next/link";
import Container from "@/components/base/Container/Container";

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const session = useSession()
    console.log(session)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
            return;
        }

        router.push("/"); // Редирект после успешного входа
    };

    return (
        <div
            className={classes.authBg}
            style={{
                background: `url('/bg_auth.jpg')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className={classes.auth}>
                <div
                    className={classes.bg_auth}
                    style={{
                        background: `url('/bg_auth.jpg')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                ></div>

                <div className={classes.form}>
                    <h2>Welcome Back</h2>
                    <p>Enter your email and password to access your account</p>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className={classes.check}>
                            <div>
                                <input type="checkbox" id="check" />
                                <label htmlFor="check">Remember me</label>
                            </div>
                            <Link
                                href=""
                                style={{
                                    fontSize: "13px",
                                    textDecoration: "none",
                                    color: "#4C4C4C",
                                }}
                            >
                                Forgot Password
                            </Link>
                        </div>

                        <button type="submit">Sign in</button>
                    </form>

                    <p>
                        Don't have an account?{" "}
                        <Link
                            href=""
                            style={{
                                fontSize: "13px",
                                textDecoration: "none",
                                color: "#4C4C4C",
                            }}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
