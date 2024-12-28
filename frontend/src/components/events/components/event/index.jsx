'use client';
import React from 'react'
import styles from './style.module.css';

export default function index({index, title, place, time, manageModal}) {
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) throw new Error('Invalid date');
            
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(date);
        } catch (error) {
            console.error('Date parsing error:', error);
            return dateString;
        }
    };

    const isAvailable = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return new Date(time) > tomorrow;
    };

    return (
        <div 
            onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} 
            onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} 
            className={styles.project}
        >
            <h2>{title}</h2>
            <div className={styles.details}>
                <p>{place}</p>
                <span>/</span>
                <p>{formatDate(time)}</p>
                <span className={`${styles.status} ${isAvailable() ? styles.available : styles.unavailable}`}>
                    {isAvailable() ? 'Available' : 'Unavailable'}
                </span>
            </div>
        </div>
    )
}
