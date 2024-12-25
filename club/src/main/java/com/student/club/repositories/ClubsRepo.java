package com.student.club.repositories;


import com.student.club.records.Clubs;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubsRepo extends CrudRepository<Clubs, String> {

}
