'use client';

import { useEffect, useState } from "react";
import classes from "./NewsBlock.module.scss";
import Container from "../Container/Container";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { $url } from "@/api/api";


interface NewsItem {
    newsTitle: string;
    newsContent: string;
    username: string;
  }
  
export default function NewsBlock() {
    const [news, setNews] = useState<NewsItem[]>([]);

    // useEffect(() => {
    //     fetch(`${$url}/api/v1/news/detAllNews`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (Array.isArray(data)) {
    //                 setNews(data.slice(0, 10));
    //             } else if (data && Array.isArray(data.news)) {
    //                 setNews(data.news.slice(0, 10));
    //             } else {
    //                 console.error("Unexpected API response:", data);
    //             }
    //         })
    //         .catch((error) => console.error("Error fetching news:", error));
    // }, []);

    return (
        <div className={classes.wrapper}>
            <Container>
                <div className={classes.insideWrapper}>
                    <div className={classes.TitleWrapper}>
                        <p className={classes.Title}>Recent News</p>
                        <Link href="/news">
                            <span className={classes.arrow}>→</span>
                        </Link>
                    </div>
                    <Swiper spaceBetween={20} slidesPerView={2}>
                        {news.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={classes.block}>
                                    <div className={classes.ContentWrapper}>
                                        <p className={classes.contentTitle}>{item.newsTitle}</p>
                                        <p className={classes.contentText}>{item.newsContent}</p>
                                        <p className={classes.contentText}>{item.username}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </div>
    );
}