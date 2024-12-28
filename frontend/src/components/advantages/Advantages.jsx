"use client"
import ParallaxImage from "../../common/ParallaxImage";
import styles from './Advantages.module.css';

export default function Advantages() {
  return (
    <section className={styles.section}>
      <div className="img">
        <ParallaxImage 
          src="/Images/5.png" 
          alt="NextGen Tech Advantages" 
        />
      </div>

      <div className={styles.brief}>
        <p>
          Empower your future with NextGen Tech. From fostering innovation in cybersecurity to advancing AI-driven solutions, we provide the tools, knowledge, and experience to shape the tech landscape of tomorrow.
        </p>
      </div>

      <div className={styles.cover}>
        <div className="img">
          <ParallaxImage 
            src="/Images/12.png" 
            alt="NextGen Tech Values" 
          />
        </div>
      </div>

      <div className={styles.list}>
        <div className={styles.project}>
          <h1>Innovation</h1>
          <p>Hands-on projects / Latest standards / Real-world applications</p>
        </div>

        <div className={styles.project}>
          <h1>Collaboration</h1>
          <p>Community-driven / Expert mentorship / Networking opportunities</p>
        </div>

        <div className={styles.project}>
          <h1>Future-Ready</h1>
          <p>Industry insights / Career-focused workshops / Cutting-edge skills</p>
        </div>
      </div>
    </section>
  );
}

