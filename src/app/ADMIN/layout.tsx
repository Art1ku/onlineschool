"use client";
import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Navbar from "@/components/layout/Navbar/Navbar";
import classes from '@/styles/Admin.module.scss'

export default function AdminLayout({children}: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={classes.admin}>
            <Sidebar isOpen={isOpen}/>
            <div style={{flex: 1, transition: "margin-left 0.3s", marginLeft: isOpen ? "250px" : "0px"}}>
                <Navbar toggleSidebar={() => setIsOpen(!isOpen)}/>
                <div style={{padding: "20px"}}>
                    {children}
                </div>
                <div className={classes.end}>
                    <p>Made with ❤ by Красавчики</p>
                </div>
            </div>
        </div>
    );
}