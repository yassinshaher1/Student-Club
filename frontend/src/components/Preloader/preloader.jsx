'use client';
import styles from './preloader.module.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';
import Image from 'next/image';

const items = ["NEXT", "GEN", "TECH", "image"];

export default function Index() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({width: 0, height:0});

    useEffect(() => {
        setDimension({width: window.innerWidth, height: window.innerHeight});
    }, []);

    useEffect(() => {
        if(index === items.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    };

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            {dimension.width > 0 && 
            <>
                {index < items.length - 1 ? (
                    <motion.p variants={opacity} initial="initial" animate="enter">
                        <span></span>{items[index]}
                    </motion.p>
                ) : (
                    <motion.div 
                        variants={opacity} 
                        initial="initial" 
                        animate="enter"
                        className={styles.imageContainer}
                    >
                        <Image
                            src="/LOGO.png"
                            alt="Logo"
                            width={200}
                            height={200}
                            priority
                            className={styles.logo}
                        />
                    </motion.div>
                )}
                <svg>
                    <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                </svg>
            </>
            }
        </motion.div>
    );
}
