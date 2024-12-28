package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Events(

        @Id
        Integer eventId,
        String name,
        String description,
        LocalDateTime event_date,
        String location
) {
}
