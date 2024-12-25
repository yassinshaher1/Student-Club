package com.student.club.repositories;


import com.student.club.records.ClubRoles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRolesRepo extends CrudRepository<ClubRoles, String> {

}
