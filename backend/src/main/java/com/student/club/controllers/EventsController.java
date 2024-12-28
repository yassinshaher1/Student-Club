package com.student.club.controllers;


import com.student.club.records.Events;
import com.student.club.services.EventsServices;
import com.student.club.status.EventsStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventsController {
    private final EventsServices eventsServices;

    @Autowired
    public EventsController(EventsServices eventsServices) {
        this.eventsServices = eventsServices;
    }

    @GetMapping("/add-event")
    public ResponseEntity<?> addEvent(@RequestParam("name") String name, @RequestParam("description") String description, @RequestParam("eventDate") LocalDateTime eventDate, @RequestParam("location") String location) {

        try{
            Events event = new Events(null, name, description, eventDate, location);
            EventsStatus status = eventsServices.addEvent(event);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.status(HttpStatus.CREATED).body("Event added successfully");
                case CANNOT_ADD_EVENT:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error");
                case ALREADY_EXIST:
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Event already exists");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
        }
    }
}
