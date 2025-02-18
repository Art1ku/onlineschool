'use client'

import {useState} from "react";

import Slider from "@/components/base/Slider/Slider";
import "./page.module.css"
import Statistic from "@/components/base/Statistic/Statistic";
import cl  from  "./page.module.css"
import Hero_1 from "@/components/base/main/section_hero_1/Hero_1";
import Hero_2 from "@/components/base/main/section_hero_2/Hero_2";
import Hero_3 from "@/components/base/main/section_hero_3/Hero_3";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

export default function Home() {

    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className={cl.body}>
                <Header/>
                <Slider></Slider>
                <Hero_1/>
                {/*<RegisterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />*/}
                <Statistic></Statistic>
                <Hero_2/>
                <Hero_3/>
                <Footer/>
            </div>
        </>
    );
}
