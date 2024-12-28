package com.student.club.services;

import com.student.club.records.Events;
import com.student.club.records.Users;
import com.student.club.repositories.EventsRepo;
import com.student.club.status.EventsStatus;
import com.student.club.status.UsersStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventsServices {

    private final EventsRepo eventsRepo;

    @Autowired
    public EventsServices(EventsRepo eventsRepo) {
        this.eventsRepo = eventsRepo;
    }

    public List<Events> getAllEvents() {
        return (List<Events>) eventsRepo.findAll();
    }

    public EventsStatus addEvent(Events event) {
        try{
            Optional<Events> optionalUser = eventsRepo.selectByName(event.name());
            if (optionalUser.isPresent()) {
                return EventsStatus.ALREADY_EXIST;
            }
//            eventsRepo.save(event);
            eventsRepo.save(new Events(null, event.name(), event.description(), event.event_date(), event.location()));
            return EventsStatus.SUCCESS;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return EventsStatus.CANNOT_ADD_EVENT;
        }
    }

    public EventsStatus updateEvent(String name,Events eventDTO) {
        Optional<Events> optionalEvents = eventsRepo.selectByName(name);
        if (optionalEvents.isEmpty()){
            return EventsStatus.EVENT_NOT_EXIST;
        }

        Events event = optionalEvents.get();
        Events updatedEvent = new Events(
                event.eventId(),
                eventDTO.name() != null ? eventDTO.name() : event.name(),
                eventDTO.description() != null ? eventDTO.description() : event.description(),
                eventDTO.event_date() != null ? eventDTO.event_date() : event.event_date(),
                eventDTO.location() != null ? eventDTO.location() : event.location()
        );
        eventsRepo.save(updatedEvent);
        return EventsStatus.SUCCESS;
    }

    public EventsStatus deleteEvent(String name) {
        Optional<Events> optionalEvents = eventsRepo.selectByName(name);
        if (optionalEvents.isEmpty()){
            return EventsStatus.EVENT_NOT_EXIST;
        }

        Events event = optionalEvents.get();
        eventsRepo.delete(event);
        return EventsStatus.SUCCESS;
    }
}
