import React, { useState } from 'react'
import styles from './style.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Team",
    href: "/team",
  },
  {
    title: "Join",
    href: "/signup",
  },
]

export default function Nav({ isActive, setIsActive }) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
    >
      <div className={styles.body}>
        <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return <Link 
              key={index} 
              data={{...data, index}} 
              isActive={selectedIndicator == data.href} 
              setSelectedIndicator={setSelectedIndicator}
              setIsActive={setIsActive}
            />
          })}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  )
}