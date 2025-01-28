'use client'
import {$url} from "@/api/api";
import axios from "axios";
import {useEffect} from "react";
import {useState} from "react";
import RegisterModal from "@/components/base/RegisterModal/RegisterModal";
import Header from "@/components/base/Header/Header";
import Footer from "@/components/base/Footer/Footer";
<<<<<<< HEAD
import cl  from  "./page.module.css"
import Hero_1 from "@/components/base/main/section_hero_1/Hero_1";
import Hero_2 from "@/components/base/main/section_hero_2/Hero_2";
import Hero_3 from "@/components/base/main/section_hero_3/Hero_3";

export default function Home() {
=======
import "./page.module.css"
import Application from "@/app/pages/application/page";
import Link from "next/link";

export default function Home() {

  const user =  {
    "email": "ldhxhfdsfdsgfddgbk",
    "password": "3pogj3p4g2",
    "roles": "PARENT"
  };
>>>>>>> 4db280174c84bf95c098e5b51ac643b68710a9a8

    const user = {
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

<<<<<<< HEAD
    return (
        <>
            <div className={cl.body}>
                <Header/>
                {/*<button onClick={sendPost}>Send Post</button>*/}
                <Hero_1/>

                <Hero_2/>
                <Hero_3/>

                {/*<button onClick={() => setModalOpen(true)}>Open Modal</button>*/}
                {/*<RegisterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>*/}
                {/*<Footer/>*/}
            </div>
        </>
    );
=======
  return (
    <>
      <Header></Header>
      <Link href="/application">Go to Application</Link>
    </>
  );
>>>>>>> 4db280174c84bf95c098e5b51ac643b68710a9a8
}

