package com.example.builderservice.services;

import com.example.builderservice.models.Builder;
import com.example.builderservice.repository.BuilderRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BuilderService {
  private final BuilderRepository repo;

  public BuilderService(BuilderRepository repo) {
    this.repo = repo;
  }

  public List<Builder> getAll() {
    return repo.findAll();
  }

  public List<Builder> getByUser(String idUser) {
    return repo.findByIdUser(idUser);
  }

  public Builder create(Builder builder) {
    builder.setCreatedAt(Instant.now());
    builder.setUpdatedAt(Instant.now());
    return repo.save(builder);
  }

  public Builder update(String id, Builder data) {
    Builder existing = repo.findById(id).orElseThrow();
    existing.setTitle(data.getTitle());
    existing.setPages(data.getPages());
    existing.setSettings(data.getSettings());
    existing.setUpdatedAt(Instant.now());
    return repo.save(existing);
  }
}
