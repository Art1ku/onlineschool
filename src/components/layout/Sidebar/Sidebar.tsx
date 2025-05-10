import React from "react";
import classes from "./Sidebar.module.scss";
import Links from "@/components/navigation/Links/Links";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
    return (
        <div className={`${classes.sidebar} ${isOpen ? classes.open : classes.closed}`}>
            {isOpen && (
                <div>
                    <div className={classes.logo}>
                        <img src="/header_logo_white.svg" alt=""/>
                    </div>
                    <div className={classes.nav_Links}>
                        <Links href="ADMIN" icon="/home.svg" img="/arrow_forward.svg" text="Dashboard" />
                        <Links href="ADMIN/users" icon="/user.svg" img="/arrow_forward.svg" text="Users" />
                        <Links href="ADMIN/logs" icon="/logs.svg" img="/arrow_forward.svg" text="Logs" />
                        <Links href="ADMIN/schedule" icon="/schedule.svg" img="/arrow_forward.svg" text="Schedule" />
                        <Links href="ADMIN/applications" icon="/application.svg" img="/arrow_forward.svg" text="Applications" />
                        <Links href="ADMIN/documents" icon="/documents.svg" img="/arrow_forward.svg" text="Documents" />
                        <Links href="ADMIN  /settings" icon="/settings.svg" img="/arrow_forward.svg" text="Settings" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;