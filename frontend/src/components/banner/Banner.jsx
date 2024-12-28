"use client"
import ParallaxImage from "../../common/ParallaxImage";
import styles from './Banner.module.css';
import AnimatedButton from "../../common/AnimatedButton";

export default function Banner() {
  return (
    <section className={styles.section}>
      <div className="img">
        <ParallaxImage 
          src="/Images/8.png" 
          alt="Banner" 
        />
      </div>

      <div className={styles.copy}>
        <p>Empower Your</p>
        <h1>Future in Tech</h1>
        <p>
          Stay ahead with cutting-edge updates on workshops, bootcamps, events, and the latest innovations in technology.
        </p>
        <AnimatedButton color="var(--color-primary)">Learn More</AnimatedButton>
      </div>
    </section>
  );
} 