import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image 
                    src='/images/site/test.png' 
                    alt='An image showing Temitope' 
                    width={300} 
                    height={300}
                    priority // This ensures the image is loaded with high priority
                />
            </div>
            <h1>Hi, I'm Temitope</h1>
            <p>
                I blog about web development - especially frontend frameworks like 
                Angular or React.
            </p>
        </section>
    );
}

export default Hero;
