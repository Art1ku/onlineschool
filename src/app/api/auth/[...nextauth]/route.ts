import NextAuth from "next-auth";
import {authOptions} from "@/auth";

const hadnler = NextAuth(authOptions);
export {hadnler as GET, hadnler as POST}