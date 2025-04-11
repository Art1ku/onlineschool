import React from "react";
import classes from "./Sidebar.module.scss";
import Links from "@/components/navigation/Links/Links";
import { useSidebar } from "@/components/context/SidebarContext";

const Sidebar = () => {

    const { isOpen } = useSidebar();

    return (
        <div className={`${classes.sidebar} ${isOpen ? classes.open : classes.closed}`}>
            {isOpen && (
                <div>
                    <div className={classes.logo}>
                        <img src="/header_logo_white.svg" alt=""/>
                    </div>
                    <div className={classes.nav_Links}>
                        <Links href="dashboard" icon="/home.svg" img="/arrow_forward.svg" text="Dashboard" />
                        <Links href="ADMIN/users" icon="/user.svg" img="/arrow_forward.svg" text="Users" />
                        <Links href="dashboard/logs" icon="/logs.svg" img="/arrow_forward.svg" text="Logs" />
                        <Links href="dashboard/schedule" icon="/schedule.svg" img="/arrow_forward.svg" text="Schedule" />
                        <Links href="dashboard/applications" icon="/application.svg" img="/arrow_forward.svg" text="Applications" />
                        <Links href="dashboard/documents" icon="/documents.svg" img="/arrow_forward.svg" text="Documents" />
                        <Links href="dashboard  /settings" icon="/settings.svg" img="/arrow_forward.svg" text="Settings" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;