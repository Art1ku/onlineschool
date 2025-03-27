'use client'

import Slider from "@/components/base/Slider/Slider";
import Statistic from "@/components/base/Statistic/Statistic";
import classes from "./main.module.css"
import Hero_1 from "@/components/base/main/section_hero_1/Hero_1";
import Hero_2 from "@/components/base/main/section_hero_2/Hero_2";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import NewsBlock from "@/components/base/NewsBlock/NewsBlock";
import BlockLinks from "@/components/base/BlockLinks/BlockLinks";
import { useSession } from "next-auth/react";

export default function Home() {

    const session = useSession()
    console.log(session);
    

    return (
        <>
            <div className={classes.body}>
                <Header/>
                <Slider></Slider>
                <section id="section1">
                    <Hero_1/>
                </section>
                {/*<RegisterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />*/}
                <section id="section2">
                    <Statistic></Statistic>
                </section>
                <section id="section3">
                    <Hero_2/>
                </section>
                <section id="section4">
                    <NewsBlock></NewsBlock>
                </section>
                <section id="section5">
                    <BlockLinks></BlockLinks>
                </section>
                <Footer/>
            </div>
        </>
    );
}
