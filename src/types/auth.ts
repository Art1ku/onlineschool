import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ChangeEvent, FormEvent } from "react";
// import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface AuthenticatedFields {
    identifier: string;
    password: string;
}

export interface CustomJWTType extends JWT {
    accessTokenExpires: number;
    accessToken: string;
    refreshToken: string;
}

export interface JWTUser extends User {
    accessToken: string,
    refreshToken: string,
    accessTokenExpires: number,
    userDetails:any
}

export interface ReponseUserToken {
    accessToken: string;
    refreshToken: string;
    expireIn: number
}


export type TypeAuthMethod = 'Login' | 'Register'

export interface IAuth {
    type?: TypeAuthMethod
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}