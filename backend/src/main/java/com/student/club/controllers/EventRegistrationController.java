package com.student.club.controllers;


import com.student.club.records.EventRegistrations;
import com.student.club.repositories.EventsRepo;
import com.student.club.repositories.UsersRepo;
import com.student.club.services.EventRegistrationService;
import com.student.club.status.EventRegistrationStatus;
import com.student.club.status.UsersStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:3000")
public class EventRegistrationController {
    private final EventRegistrationService eventRegistrationService;

    @Autowired
    public EventRegistrationController(EventRegistrationService eventRegistrationService, EventsRepo eventsRepo, UsersRepo usersRepo) {
        this.eventRegistrationService = eventRegistrationService;
    }

    @GetMapping("/add")
    public ResponseEntity<?> Resgister(@RequestParam("eventName") String eventName, @RequestParam("userName") String userName){

        try{
            EventRegistrations reg = new EventRegistrations(null, eventName, userName, LocalDateTime.now(), EventRegistrationStatus.DIDNT_ATTENED);
            EventRegistrationStatus status = eventRegistrationService.addRegistration(reg);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
                case CANNOT_REGISTER:
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Registration cannot register");
                case ALREADY_REGISTERED:
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Registration already registered");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
            }
        } catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public List<EventRegistrations> getAll(){
        return eventRegistrationService.getAllRegistrations();
    }

    @GetMapping("/delete")
    public ResponseEntity<?> deleteReg(@RequestParam("eventName") String eventName, @RequestParam("userName") String userName){
        try{
            EventRegistrationStatus status = eventRegistrationService.deleteEventRegistration(eventName, userName);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.ok("reg deleted successfully");
                case REGISTRATION_DOESNT_EXIST:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("reg  not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    }
}
