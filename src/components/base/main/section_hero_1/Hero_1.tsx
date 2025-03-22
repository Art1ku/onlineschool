
import Container from "../../Container/Container";
import classes from './section_hero_1_style_1/Hero_Style.module.scss'


const Hero_1 = () => {
    

    
    return (
        <div className={classes.hero}>
            <Container>
                <div className={classes.insideWrapper}>
                    <div className={classes.box_1}>
                        <div className={classes.imgDiv}></div>
                        <div className={classes.box_1_text_1}>
                            <p className={classes.Title}>Title no 1</p>
                            <p className={classes.Text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ex ab molestiae unde voluptas nobis, possimus fuga labore ipsum illo velit recusandae ducimus eius, perferendis assumenda ipsa quia amet itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique modi perferendis beatae consectetur sed accusantium quibusdam quam distinctio sint natus? Inventore dolor at eveniet libero perferendis sit voluptatem fugiat et?</p>
                        </div>
                    </div>
                    <div className={classes.box_2}>
                        <div className={classes.box_2_text_2}>
                            <p className={classes.Title}>Title no 2</p>
                            <p className={classes.Text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus iusto ea, dolore culpa neque inventore, recusandae, laborum debitis sapiente aut adipisci ex? Deserunt officiis sequi dolorum, officia cum ea dicta. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis tenetur dolorem non, incidunt veritatis libero voluptates saepe cumque. Repellendus quam atque suscipit esse ratione temporibus tempore voluptate dolorum? Aut, doloribus! </p>
                        </div>
                        <div className={classes.imgDiv}/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Hero_1;