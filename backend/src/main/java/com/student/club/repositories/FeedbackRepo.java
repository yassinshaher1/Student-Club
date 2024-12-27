package com.student.club.repositories;


import com.student.club.records.Feedback;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepo extends CrudRepository<Feedback, String> {

}
