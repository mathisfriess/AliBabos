package com.example.builderservice.controllers;

import com.example.builderservice.models.Builder;
import com.example.builderservice.services.BuilderService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/builders")
public class BuilderController {
  private final BuilderService service;

  public BuilderController(BuilderService service) {
    this.service = service;
  }

  @GetMapping
  public List<Builder> getAll() {
    return service.getAll();
  }

  @GetMapping("/user/{idUser}")
  public List<Builder> getByUser(@PathVariable String idUser) {
    return service.getByUser(idUser);
  }

  @PostMapping
  public Builder create(@RequestBody Builder builder) {
    return service.create(builder);
  }

  @PutMapping("/{id}")
  public Builder update(@PathVariable String id, @RequestBody Builder builder) {
    return service.update(id, builder);
  }
}
