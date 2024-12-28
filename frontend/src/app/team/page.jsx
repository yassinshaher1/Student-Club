"use client"
import { ReactLenis } from "@studio-freight/react-lenis";
import styles from './team.module.css';

export default function TeamPage() {
  return (
    <ReactLenis root options={{ 
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    }}>
      <main className="relative w-full overflow-hidden">
        <h1 className={styles.title}>Our Team</h1>
        <div className={styles.teamContainer}>
          {/* Team content will go here */}
        </div>
      </main>
    </ReactLenis>
  );
} 