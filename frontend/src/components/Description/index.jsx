import styles from './style.module.css';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import ParallaxImage from '../../common/ParallaxImage';
import Link from 'next/link';

export default function index() {
    const phrase = "NextGen Tech provides hands-on experience in Network Security, Computer Science, and AI through real-world projects.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <div className={styles.textContent}>
                    <p>
                    {
                        phrase.split(" ").map((word, index) => {
                            return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                        })
                    }
                    </p>
                    <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                        Focused on cutting-edge knowledge and skills, we provide a collaborative environment where students can explore emerging technologies, develop innovative solutions, and prepare for the ever-evolving tech landscape.
                    </motion.p>
                    <div data-scroll data-scroll-speed={0.1}>
                        <Link href="/team">
                            <Rounded className={styles.button}>
                                <p>The Crew</p>
                            </Rounded>
                        </Link>
                    </div>
                </div>
                <div className={styles.portraitContainer}>
                    <ParallaxImage 
                        src="/Images/10.png" 
                        alt="Portrait" 
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                </div>
            </div>
        </div>
    )
}
