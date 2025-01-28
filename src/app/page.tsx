'use client'
import {$url} from "@/api/api";
import axios from "axios";
import {useState} from "react";
import Header from "@/components/base/Header/Header";
import cl  from  "./page.module.css"
import Hero_1 from "@/components/base/main/section_hero_1/Hero_1";
import Hero_2 from "@/components/base/main/section_hero_2/Hero_2";
import Hero_3 from "@/components/base/main/section_hero_3/Hero_3";


export default function Home() {

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
}