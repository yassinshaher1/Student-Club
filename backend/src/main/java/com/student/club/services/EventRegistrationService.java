package com.student.club.services;


import com.student.club.records.EventRegistrations;
import com.student.club.repositories.EventRegistrationRepo;
import com.student.club.status.EventRegistrationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventRegistrationService {

    private final EventRegistrationRepo eventRegistrationRepo;

    @Autowired
    public EventRegistrationService(EventRegistrationRepo eventRegistrationRepo) {
        this.eventRegistrationRepo = eventRegistrationRepo;
    }

    public List<EventRegistrations> getAllEventRegistrations() {
        return (List<EventRegistrations>) eventRegistrationRepo.findAll();
    }

    public EventRegistrationStatus addRegistration(EventRegistrations registration) {
        try{
            Optional<EventRegistrations> optionalEventRegistration = eventRegistrationRepo.findByEventIdAndUserId(registration.eventName(), registration.userName());
            if (optionalEventRegistration.isPresent()) {
                return EventRegistrationStatus.ALREADY_REGISTERED;
            }

            eventRegistrationRepo.saveEventRegistration(registration.eventName(), registration.userName(), registration.registrationDate(), String.valueOf(registration.status()));
            return EventRegistrationStatus.SUCCESS;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return EventRegistrationStatus.CANNOT_REGISTER;
        }
    }

    public List<EventRegistrations> getAllRegistrations() {
        return (List<EventRegistrations>) eventRegistrationRepo.findAll();
    }


//    public EventRegistrationStatus updateRegistration(Integer eventId, Integer userId, EventRegistration eventRegistrationDTO) {
//        Optional<EventRegistration> optionalEventRegistration = eventRegistrationRepo.findByEventIdAndUserId();
//        if (optionalEventRegistration.isEmpty()){
//            return EventRegistrationStatus.REGISTRATION_DOESNT_EXIST;
//        }
//
//        EventRegistration eventRegistration = optionalEventRegistration.get();
//        EventRegistration updatedEvent = new EventRegistration(
//                eventRegistration.eventId(),
//                eventRegistrationDTO.eventId() != null ? eventRegistrationDTO.eventId() : eventRegistration.eventId(),
//                eventRegistrationDTO.userId() != null ? eventRegistrationDTO.userId() : eventRegistration.userId(),
//                eventRegistration.registrationDate(),
//                eventRegistrationDTO.status() != null ? eventRegistrationDTO.status() : eventRegistration.status()
//        );
//        eventRegistrationRepo.save(updatedEvent);
//        return EventRegistrationStatus.SUCCESS;
//    }
//
    public EventRegistrationStatus deleteEventRegistration(String eventName, String userName) {
        Optional<EventRegistrations> optionalEventRegistration = eventRegistrationRepo.findByEventIdAndUserId(eventName, userName);
        if (optionalEventRegistration.isEmpty()){
            return EventRegistrationStatus.REGISTRATION_DOESNT_EXIST;
        }
        EventRegistrations eventRegistration = optionalEventRegistration.get();
        eventRegistrationRepo.delete(eventRegistration);
        return EventRegistrationStatus.SUCCESS;
    }
//
//    public EventRegistrationStatus attendance(Integer eventId, Integer userId) {
//        Optional<EventRegistration> optionalEventRegistration = eventRegistrationRepo.findByEventIdAndUserId(eventId, userId);
//        if (optionalEventRegistration.isEmpty()){
//            return EventRegistrationStatus.REGISTRATION_DOESNT_EXIST;
//        }
//        EventRegistration eventRegistration = optionalEventRegistration.get();
//        EventRegistration attendedEvent = new EventRegistration(null, eventId, userId, eventRegistration.registrationDate(), EventRegistrationStatus.ATTENDED);
//        eventRegistrationRepo.save(attendedEvent);
//        return EventRegistrationStatus.SUCCESS;
//    }
}
