"use client"
import { ReactLenis } from "@studio-freight/react-lenis";
import styles from './signup.module.css';

export default function SignupPage() {
  return (
    <ReactLenis root options={{ 
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    }}>
      <main className="relative w-full overflow-hidden">
        <h1 className={styles.title}>Join Us</h1>
        <div className={styles.signupContainer}>
          {/* Signup form will go here */}
        </div>
      </main>
    </ReactLenis>
  );
} 