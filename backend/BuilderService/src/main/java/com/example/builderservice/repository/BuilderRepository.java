package com.example.builderservice.repository;

import com.example.builderservice.models.Builder;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BuilderRepository extends MongoRepository<Builder, String> {
  List<Builder> findByIdUser(String idUser);
}
