package com.example.builderservice.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "builders")
public class Builder {
    @Id
    private String id;
    private String idUser;
    private String title;
    private List<Map<String, Object>> pages;
    private Map<String, Object> settings;
    private Instant createdAt;
    private Instant updatedAt;

    // Getters/Setters
}
