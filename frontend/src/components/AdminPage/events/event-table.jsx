import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EventDialog } from "./event-dialog";
import { listEvents, addEvent, updateEvent, deleteEvent } from "@/lib/services/events";
import { SearchBar } from "@/components/ui/search-bar";

export function EventTable() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsList = await listEvents();
      setEvents(eventsList);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setError("Failed to load events");
    }
  };

  const handleDelete = async (name) => {
    try {
      await deleteEvent(name);
      await fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
      setError("Failed to delete event");
    }
  };

  const handleSave = async (eventData) => {
    try {
      if (selectedEvent) {
        // Update existing event
        await updateEvent(selectedEvent.name, {
          name: eventData.title,
          description: eventData.description,
          eventDate: `${eventData.date}T${eventData.time}`,
          location: eventData.location
        });
      } else {
        // Add new event
        await addEvent({
          name: eventData.title,
          description: eventData.description,
          eventDate: `${eventData.date}T${eventData.time}`,
          location: eventData.location
        });
      }
      await fetchEvents();
      setIsDialogOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to save event:', error);
      setError(error.message || "Failed to save event");
    }
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button onClick={() => {
          setSelectedEvent(null);
          setIsDialogOpen(true);
        }}>Add Event</Button>
      </div>
      <div className="mb-4">
        <SearchBar 
          placeholder="Search events..." 
          onSearch={setSearchQuery}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
          {filteredEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{new Date(event.eventDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(event.eventDate).toLocaleTimeString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                {new Date(event.eventDate) > new Date() ? 'upcoming' : 'completed'}
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedEvent({
                      ...event,
                      title: event.name,
                      date: new Date(event.eventDate).toISOString().split('T')[0],
                      time: new Date(event.eventDate).toTimeString().split(' ')[0].slice(0, 5)
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(event.name)}
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