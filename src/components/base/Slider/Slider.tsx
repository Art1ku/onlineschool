'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "./Slider.module.scss";
import sliderData from "./sliderData.json";

export default function Slider() {
  return (
    <div className={classes.wrapper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className={classes.sliderContainer}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} className={classes.slideWrapper}>
            <div
              className={classes.slide}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className={classes.overlay}></div>
              <div className={classes.text}>{slide.text}</div>
              <div className={classes.subText}>{slide.subText}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
