"use client"
import { useState } from 'react';
import Events from "../../components/events";
import { ReactLenis } from "@studio-freight/react-lenis";
import styles from './events.module.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventsPage() {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <ReactLenis root options={{ 
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    }}>
      <main className="relative w-full overflow-hidden">
        <h1 className={styles.title}>
          Upcoming Events
        </h1>
        <div className={styles.sortContainer}>
          <Select onValueChange={setSortBy} defaultValue="date">
            <SelectTrigger className={`w-[180px] ${styles.customSelect}`}>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className={styles.selectContent}>
              <SelectItem className={styles.selectItem} value="date">Sort by Date</SelectItem>
              <SelectItem className={styles.selectItem} value="name">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSortOrder} defaultValue="asc">
            <SelectTrigger className={`w-[180px] ${styles.customSelect}`}>
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent className={styles.selectContent}>
              <SelectItem className={styles.selectItem} value="asc">Ascending</SelectItem>
              <SelectItem className={styles.selectItem} value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Events showAll sortBy={sortBy} sortOrder={sortOrder} />
      </main>
    </ReactLenis>
  );
} 