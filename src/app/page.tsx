'use client'
import { $url } from "@/api/api";
import axios from "axios";
import { useState } from "react";
import Header from "@/components/layout/Header/Header";
import Link from "next/link";

export default function Home() {

  const user =  {
    "email": "ldhxhfdsfdsgfddgbk",
    "password": "3pogj3p4g2",
    "roles": "PARENT"
  };

  const sendPost = async () => {
    try {
      const res = await axios.get(`${$url}/api/v1/user/get-all-users`);
      const data = res.data;
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header></Header>
      <Link href='/authentication'>authentication</Link>
      <Link href="/application">Go to Application</Link>
    </>
  );
}

