import React from 'react';
import cl from "./section_hero_3_style_3/hero_style3.module.scss"
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import Brain from "../../../../../public/images/brain 1.svg"

const Hero3 = () => {
    return (
        <div className={cl.hero_3}>
            <div className={cl.hero_3_container}>
                <div className={cl.container}>
                    <div className={cl.section_name}>
                        <h1>NEWS</h1>
                    </div>
                    <Swiper

                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <div className={cl.cart_container}>
                                <img className={cl.cart_img} src={Brain.src}/>
                                <h2> Neural Networks Do Not Work Like Human Brains – Let’s Debunk The Myth</h2>
                                <button>read more ></button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cl.cart_container}>
                                <img className={cl.cart_img} src={Brain.src}/>
                                <h2> Neural Networks Do Not Work Like Human Brains – Let’s Debunk The Myth</h2>
                                <button>read more ></button>
                            </div>
                        </SwiperSlide>                        <SwiperSlide>
                        <div className={cl.cart_container}>
                            <img className={cl.cart_img} src={Brain.src}/>
                            <h2> Neural Networks Do Not Work Like Human Brains – Let’s Debunk The Myth</h2>
                            <button>read more ></button>
                        </div>
                    </SwiperSlide>                        <SwiperSlide>
                        <div className={cl.cart_container}>
                            <img className={cl.cart_img} src={Brain.src}/>
                            <h2> Neural Networks Do Not Work Like Human Brains – Let’s Debunk The Myth</h2>
                            <button>read more ></button>
                        </div>
                    </SwiperSlide>




                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Hero3;