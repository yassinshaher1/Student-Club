package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record MemberClubRelationship(

        @Id
        Integer userId,
        Integer clubId,
        String role,
        LocalDateTime joinedAt
) {
}
