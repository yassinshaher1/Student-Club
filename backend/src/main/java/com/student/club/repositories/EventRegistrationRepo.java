package com.student.club.repositories;


import com.student.club.records.EventRegistration;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRegistrationRepo extends CrudRepository<EventRegistration, String> {

}
