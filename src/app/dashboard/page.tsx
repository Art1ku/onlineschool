"use client";

import AdminLayout from "@/components/layout/Admin/AdminLayout";
import Header from "@/components/layout/Header/Header";
import Loader from "@/components/ui/Loader/Loader";
import { useAuthStore } from "@/store/userStore";
// import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  // const { user } = useAuthStore();
  // const session = useSession()
  // console.log(user);
  
  // const role = user?.roles[0]?.title; 

  const role = 'ADMIN'

  const roleComponents = {
    ADMIN: <AdminLayout />,
    PARENT: <Header />, 
    TEACHER:<Header />,
  };

  return (
    <div>
      {roleComponents[role] || <Loader/>}
    </div>
  );
};

export default DashboardPage;