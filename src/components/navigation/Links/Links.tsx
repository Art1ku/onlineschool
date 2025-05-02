//import classes from './links.module.scss'
import Link from "next/link";

interface LinkProps {
    href: string;
    img: string;
    icon: string;
    text: string
}

const Links = ({href,icon,img,text}: LinkProps) => {
    return (
        <Link style={{textDecoration:'none'}} href={`/${href}`}>
            <div className={classes.links}>
                <div>
                    <img src={icon} alt=""/>
                    <h2 style={{color:'white',fontSize:'15px',fontWeight:'400'}}>{text}</h2>
                </div>
                <img className={classes.arrow} src={img} alt=""/>
            </div>
        </Link>
    );
};

export default Links;