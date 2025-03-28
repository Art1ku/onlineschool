"use client";

import Header from "@/components/layout/Header/Header";
import { useAuthStore } from "@/store/userStore";
import { useSession } from "next-auth/react";
import React from "react";
// import AdminLayout from "../ADMIN/layout";
// import TeacherDashboard from "../TEACHER/layout";
// import StudentDashboard from "../STUDENT/layout";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const session = useSession()
  console.log(session);
  
  const role = user?.roles[0]?.title; // Безопасная проверка

  const roleComponents = {
    ADMIN: <Header />,
    // TEACHER: <TeacherDashboard />,
    // STUDENT: <StudentDashboard />,
    PARENT: <Header />, // Родители могут видеть только шапку
  };

  return (
    <div>
      {roleComponents[role] || <p>Нет доступа</p>}
    </div>
  );
};

export default DashboardPage;
