package com.student.club.repositories;


import com.student.club.records.Users;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepo extends CrudRepository<Users, String> {

    @Query("SELECT * FROM users WHERE email = :email LIMIT 1")
    Optional<Users> selectByEmail(String email);

    @Query("SELECT user_id FROM users WHERE email = :email LIMIT 1")
    Integer getIdByEmail(String email);
}
