package com.student.club.repositories;


import com.student.club.records.EventRegistration;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRegistrationRepo extends CrudRepository<EventRegistration, String> {

    @Query("SELECT * FROM event_registrations WHERE event_id = :eventId AND user_id = :userId LIMIT 1")
    Optional<EventRegistration> findByEventIdAndUserId(Integer eventId, Integer userId);

}
