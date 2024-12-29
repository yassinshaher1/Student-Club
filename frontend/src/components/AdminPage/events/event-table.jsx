import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EventDialog } from "./event-dialog";
import { getAllEvents } from "@/data/events";
import { v4 as uuidv4 } from 'uuid';

export function EventTable() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const eventsList = getAllEvents().map(event => ({
      id: uuidv4(),
      title: event.title,
      location: event.place,
      date: event.time.split(' ')[0],
      time: event.time.split(' ')[1],
      status: new Date(event.time) > new Date() ? 'upcoming' : 'completed'
    }));
    setEvents(eventsList);
  }, []);

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSave = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...eventData } : event
      ));
    } else {
      setEvents([...events, { 
        id: uuidv4(), 
        ...eventData, 
        status: 'upcoming',
        time: `${eventData.date} ${eventData.time}`
      }]);
    }
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button onClick={() => {
          setSelectedEvent(null);
          setIsDialogOpen(true);
        }}>Add Event</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EventDialog
        event={selectedEvent}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}