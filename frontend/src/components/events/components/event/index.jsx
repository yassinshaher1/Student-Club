'use client';
import React from 'react'
import styles from './style.module.css';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { registerForEvent } from "@/lib/services/eventRegistrations";

export default function Event({index, title, place, time, description, manageModal}) {
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date string:', dateString);
                return 'Date not available';
            }
            
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC'
            }).format(date);
        } catch (error) {
            console.error('Date parsing error:', error);
            return 'Date not available';
        }
    };

    const isAvailable = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return new Date(time) > tomorrow;
    };

    const handleRegister = async () => {
        try {
            // Replace 'currentUser' with actual user name from your auth system
            await registerForEvent(title, 'currentUser');
            toast("Successfully registered!", {
                description: `You are scheduled for ${title} on ${formatDate(time)}`,
                action: {
                    label: "View Schedule",
                    onClick: () => console.log("Navigate to schedule"),
                },
            });
        } catch (error) {
            toast.error("Registration failed", {
                description: error.message,
            });
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger id={`dialog-${index}`} className="hidden" />
                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        const dialogTrigger = document.querySelector(`#dialog-${index}`);
                        if (dialogTrigger) {
                            dialogTrigger.click();
                        }
                    }}
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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <p className="text-right font-medium">Location:</p>
                            <p className="col-span-3">{place}</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <p className="text-right font-medium">Date & Time:</p>
                            <p className="col-span-3">{formatDate(time)}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            onClick={handleRegister}
                            disabled={!isAvailable()}
                        >
                            Register for Event
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
