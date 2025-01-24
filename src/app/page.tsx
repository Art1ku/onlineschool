'use client'
import { $url } from "@/api/api";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import RegisterModal from "@/components/base/RegisterModal/RegisterModal";
import Header from "@/components/base/Header/Header";
import Footer from "@/components/base/Footer/Footer";
import "./page.module.css"
import Application from "@/app/Pages/Application/page";

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
      <Application></Application>
      {/*<button onClick={sendPost}>Send Post</button>*/}

      {/*<button onClick={() => setModalOpen(true)}>Open Modal</button>*/}
      {/*<RegisterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />*/}
      {/*<Footer/>*/}
    </>
  );
}

