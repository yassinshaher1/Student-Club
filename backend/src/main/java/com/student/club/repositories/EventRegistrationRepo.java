package com.student.club.repositories;


import com.student.club.records.EventRegistrations;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EventRegistrationRepo extends CrudRepository<EventRegistrations, String> {

    @Query("SELECT * FROM event_registrations WHERE event_name = :eventName AND user_name = :userName LIMIT 1")
    Optional<EventRegistrations> findByEventIdAndUserId(String eventName, String userName);

    @Modifying
    @Query("INSERT INTO event_registrations (event_name, user_name, registration_date, status) VALUES (:eventName, :userName, :registrationDate, :status)")
    void saveEventRegistration(String eventName, String userName, LocalDateTime registrationDate, String status);

}
