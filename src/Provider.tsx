"use client";
import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "@/store/userStore";

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <Provider session={session}>
      <FetchUserData />
      {children}
    </Provider>
  );
}

// Загружаем данные пользователя после получения accessToken
const FetchUserData = () => {
  const { data: session } = useSession();
  const { user, fetchUserDetails } = useAuthStore();
  useEffect(() => {
    if (session?.user?.accessToken && !user) {
      fetchUserDetails(session.user.accessToken);
    }
  }, [session, user]);

  return null;
};
