import images from "../../../../../public/images/book-2562345-copy-1536x1024-1 1 (1).png";
import React from 'react';
import classes from './section_hero_1_style_1/Hero_Style.module.scss'


const Hero_1 = () => {
    return (
        <div className={classes.hero}>
            <div className={classes.hero_container}>
                <div className={classes.container}>
                    <div className={classes.box_1}>
                        <img src={images.src}/>
                        <div className={classes.box_1_text_1}>
                            <h3>Before you make a choice</h3>
                            <h2>A Guide to Maintaining Your Determination</h2>
                            <h3>Moving forward, even slowly, makes your goals achievable.</h3>
                        </div>
                    </div>
                    <div className={classes.box_2}>
                        <img src={images.src}/>
                        <div className={classes.box_2_text_2}>
                            <h3>Before you make a choice</h3>
                            <h2>A Guide to Maintaining Your Determination</h2>
                            <h3>Moving forward, even slowly, makes your goals achievable.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero_1;