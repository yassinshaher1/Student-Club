package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record UpdateUserDTO(
        String name,
        String email,
        String password,
        String phone,
//        LocalDateTime joinedAt,
        String role
){
        
}
