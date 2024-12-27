package com.student.club.repositories;


import com.student.club.records.MemberClubRelationship;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberClubRelationshipRepo extends CrudRepository<MemberClubRelationship, String> {

}
