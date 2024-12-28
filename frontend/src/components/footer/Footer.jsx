"use client"
import ParallaxImage from "../../common/ParallaxImage";
import styles from './Footer.module.css';
import AnimatedButton from "../../common/AnimatedButton";

export default function Footer() {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <p>INSTAGRAM / TIKTOK / DISCORD</p>
        <div className={styles.newsletter}>
          <p>Stay updated with our latest News</p>
          <AnimatedButton color="var(--color-primary)">Subscribe</AnimatedButton>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.menu}>
          <p>MENU</p>
          <div className={styles.menuItems}>
            <h1>TOUR</h1>
            <h1>UPDATES</h1>
            <h1>MERCH</h1>
            <h1>CONTACT</h1>
          </div>
        </div>

        <div className={styles.image}>
          <div className="img">
            <ParallaxImage 
              src="/images/2.png" 
              alt="Footer background" 
            />
          </div>
        </div>
      </div>
    </section>
  );
} 