'use client';
import styles from './style.module.css'
import { useState, useEffect, useRef } from 'react';
import Project from './components/event';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import Rounded from '../../common/RoundedButton';
import { getHomeEvents, getAllEvents } from '../../data/events';

export default function Events({ showAll = false, sortBy = 'date' }) {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState({active: false, index: 0});

  useEffect(() => {
    const eventsList = showAll ? getAllEvents() : getHomeEvents();
    const sortedEvents = [...eventsList].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      }
      return a.title.localeCompare(b.title);
    });
    setEvents(sortedEvents);
  }, [showAll, sortBy]);

  const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
  }

  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
    <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
      <div className={styles.body}>
        {events.map((event, index) => (
          <Project 
            key={index}
            index={index} 
            title={event.title}
            place={event.place}
            time={event.time}
            manageModal={manageModal} 
          />
        ))}
      </div>
      {!showAll && (
        <Link href="/events" style={{ textDecoration: 'none' }}>
          <Rounded>
            <p>More Events</p>
          </Rounded>
        </Link>
      )}
      <>
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
      </>
    </main>
  );
}
