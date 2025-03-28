"use client";

import Header from "@/components/layout/Header/Header";
import { useAuthStore } from "@/store/userStore";
import React from "react";
import Loader from "@/components/ui/Loader/Loader";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const roles = user?.roles?.map(r => r.title) || [];
  // console.log(roles)
  // console.log( user?.roles)

  const roleComponents = {
    ADMIN: <div><Header /></div>,
    PARENT: <Header />,
  };
  return (
      <div>
        {roles.map(role => roleComponents[role])}
        {roles.length === 0 && (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader />
            </div>
        )}
      </div>
  );


};

export default DashboardPage;
