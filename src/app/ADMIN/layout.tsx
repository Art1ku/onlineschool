"use client";
import { SidebarProvider } from "@/components/context/SidebarContext";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Navbar from "@/components/layout/Navbar/Navbar";
import classes from '@/styles/Admin.module.scss';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className={classes.admin}>
        <Sidebar />
        <div className={classes.content}>
          <Navbar />
          <div className={classes.page}>{children}</div>
          <footer className={classes.footer}>Made with ❤ by Красавчики</footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
