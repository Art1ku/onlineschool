import React from 'react';
import classes from '@/styles/auth.module.scss'
import Link from "next/link";

const Page = () => {
    return (
        <div className={classes.authBg} style={{background: `url('/bg_auth.jpg')`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
            <div className={classes.auth}>
                <div className={classes.bg_auth}
                     style={{background: `url('/bg_auth.jpg')`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>

                </div>
                <div className={classes.form}>
                    <h2>Welcome Back</h2>
                    <p>Enter your email and password to access your account</p>

                    <form action="">
                        <label htmlFor="">Email</label>
                        <input type="text"/>
                        <label htmlFor="">Password</label>
                        <input type="text"/>
                        <div className={classes.check}>
                            <div>
                                <input type="checkbox" name="" id="check"/>
                                <label htmlFor="check">Remember me</label>
                            </div>
                            <Link href='' style={{fontSize:"13px",textDecoration:'none' , color:'#4C4C4C'}}>Forgot Password</Link>
                        </div>

                        <button>Sign in</button>
                    </form>

                    <p>Don't have an account? <Link href='' style={{fontSize:"13px",textDecoration:'none' , color:'#4C4C4C'}}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Page;