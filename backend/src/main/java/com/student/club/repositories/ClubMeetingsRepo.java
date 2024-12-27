package com.student.club.repositories;


import com.student.club.records.ClubMeetings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubMeetingsRepo extends CrudRepository<ClubMeetings, String> {

}
