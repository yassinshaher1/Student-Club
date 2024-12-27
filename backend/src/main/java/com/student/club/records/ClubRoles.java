package com.student.club.records;

import org.springframework.data.annotation.Id;

public record ClubRoles(

        @Id
        Integer clubRoleId,
        String name,
        String description
) {
}
