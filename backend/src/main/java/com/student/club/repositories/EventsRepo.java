package com.student.club.repositories;


import com.student.club.records.Events;
import com.student.club.records.Users;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventsRepo extends CrudRepository<Events, String> {

    @Query("SELECT * FROM events WHERE name = :name LIMIT 1")
    Optional<Events> selectByName(String name);
}
