package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Events(

        @Id
        Integer eventId,
        Integer clubId,
        String name,
        String password,
        String phone,
        LocalDateTime event_date,
        String location
) {
}
