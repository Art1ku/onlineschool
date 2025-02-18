import React from 'react';
import cl from "./section_hero_2_style_2/hero_style2.module.scss"


const Hero_2 = () => {
    return (
        <div className={cl.hero_2}>
            <div className={cl.hero_2_container}>
                <div className={cl.container}>
                    <div>
                        <h1 className={cl.title_1}>Concentrate on mental health</h1>
                        <div className={cl.line}></div>
                        <h1 className={cl.title_2}>
                            Whether you’re looking to in crease your happiness or start a mindfulness practice, Harvard
                            experts have resources to help.
                        </h1>
                    </div>
                    <button className={cl.button_login}>Log in</button>
                </div>
            </div>
        </div>
    );
};

export default Hero_2;