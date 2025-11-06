package com.example.builderservice.repository;

import com.example.builderservice.models.Builder;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BuilderRepository extends MongoRepository<Builder, String> {
    List<Builder> findByIdUser(String idUser);
}
