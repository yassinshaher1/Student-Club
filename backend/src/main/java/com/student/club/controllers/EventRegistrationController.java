package com.student.club.controllers;


import com.student.club.records.EventRegistration;
import com.student.club.records.Events;
import com.student.club.records.UpdateUserDTO;
import com.student.club.records.Users;
import com.student.club.repositories.EventsRepo;
import com.student.club.repositories.UsersRepo;
import com.student.club.services.EventRegistrationService;
import com.student.club.services.EventsServices;
import com.student.club.status.EventRegistrationStatus;
import com.student.club.status.EventsStatus;
import com.student.club.status.UsersStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:3000")
public class EventRegistrationController {
    private final EventRegistrationService eventRegistrationService;
    private final EventsRepo eventsRepo;
    private final UsersRepo usersRepo;

    @Autowired
    public EventRegistrationController(EventRegistrationService eventRegistrationService, EventsRepo eventsRepo, UsersRepo usersRepo) {
        this.eventRegistrationService = eventRegistrationService;
        this.eventsRepo = eventsRepo;
        this.usersRepo = usersRepo;
    }

    @GetMapping("/add-registration")
    public ResponseEntity<?> addEventRegistration(@RequestParam("eventName") String eventName, @RequestParam("email") String email) {

        try{
            Integer eventId = eventsRepo.getIdByName(eventName);
            Integer userId = usersRepo.getIdByEmail(email);
            EventRegistration eventRegistration = new EventRegistration(null, eventId, userId, LocalDateTime.now(), EventRegistrationStatus.DIDNT_ATTENED);
            EventRegistrationStatus status = eventRegistrationService.addRegistration(eventRegistration);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.status(HttpStatus.CREATED).body("Registration added successfully");
                case CANNOT_REGISTER:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error");
                case ALREADY_REGISTERED:
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Registration already exists");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
        }
    }

    @PatchMapping("/update-registration")
    public ResponseEntity<?> updateEventRegistration(@RequestParam("eventName") String eventName, @RequestParam("email") String email, @RequestBody EventRegistration updates){
        try{

            Integer eventId = eventsRepo.getIdByName(eventName);
            Integer userId = usersRepo.getIdByEmail(email);
            EventRegistrationStatus status = eventRegistrationService.updateRegistration(eventId, userId ,updates);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.ok("Registration updated successfully");
                case REGISTRATION_DOESNT_EXIST:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registration not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }

    }

    @GetMapping("/delete-registration")
    public ResponseEntity<?> deleteEventRegistration(@RequestParam("eventName") String eventName, @RequestParam("email") String email){
        try{

            Integer eventId = eventsRepo.getIdByName(eventName);
            Integer userId = usersRepo.getIdByEmail(email);
            EventRegistrationStatus status = eventRegistrationService.deleteEventRegistration(eventId, userId);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.ok("Registration deleted successfully");
                case REGISTRATION_DOESNT_EXIST:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registration not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    }

    @GetMapping("/attendance")
    public ResponseEntity<?> attendance(@RequestParam("eventName") String eventName, @RequestParam("email") String email){
        try{
            Integer eventId = eventsRepo.getIdByName(eventName);
            Integer userId = usersRepo.getIdByEmail(email);
            EventRegistrationStatus status = eventRegistrationService.attendance(eventId, userId);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.ok("attendance registered successfully");
                case REGISTRATION_DOESNT_EXIST:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registration not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    }

    @GetMapping("/list-registration")
    public List<EventRegistration> getAllRegistrations(){
        return eventRegistrationService.getAllEventRegistrations();
    }
}
