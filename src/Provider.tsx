"use client"
 import React, {PropsWithChildren} from 'react';
 import {SessionProvider} from "next-auth/react";
 
 const Provider = ({children}: PropsWithChildren) => {
     return (
         <SessionProvider>
             {children}
         </SessionProvider>
     );
 };
 
 export default Provider;