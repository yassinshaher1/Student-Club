package com.student.club.repositories;


import com.student.club.records.Events;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsRepo extends CrudRepository<Events, String> {

}
