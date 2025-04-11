// "use client";

// import { useAuthStore } from "@/store/storeAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useSession } from "next-auth/react";

// const withAuth = (WrappedComponent: React.FC, allowedRoles: string[]) => {
//     return function ProtectedComponent(props: any) {
//         const { status } = useSession();
//         const user = useAuthStore((state) => state.user);
//         const router = useRouter();

//         useEffect(() => {
//             if (status === "loading") return;
//             if (!user || !allowedRoles.includes(user?.userDetails?.roles[0]?.title)) {
//                 router.replace("/403");
//             }
//         }, [user, status, router]);

//         if (status === "loading") return <div>Загрузка...</div>;

//         return allowedRoles.includes(user?.userDetails?.roles[0]?.title) ? (
//             <WrappedComponent {...props} />
//         ) : null;
//     };
// };

// export default withAuth;
