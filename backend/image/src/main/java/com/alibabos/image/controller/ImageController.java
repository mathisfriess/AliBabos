package com.alibabos.image.controller;

import com.alibabos.image.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final StorageService storageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file,
                                         @RequestParam(value = "site") String site,
                                         @RequestParam(value = "name") String name
                                         ) throws Exception {
        if (name == null || name.isBlank() || file.isEmpty() || site == null || site.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String key = site + "-" + name;

        storageService.upload(key, file);
        return ResponseEntity.ok(site + "/" + name);
    }

    @GetMapping("/{site}/{name}")
    public ResponseEntity<byte[]> download(@PathVariable("site") String site,
                                           @PathVariable("name") String name
    ) throws Exception {

        String key = site + "-" + name;

        try (InputStream in = storageService.download(key)) {
            byte[] bytes = in.readAllBytes();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + key + "\"")
                    .body(bytes);
        }
    }

    @DeleteMapping("/{site}/{name}")
    public ResponseEntity<Void> delete(@PathVariable("site") String site,
                                        @PathVariable("name") String name
    ) throws Exception {
        String key = site + "-" + name;
        storageService.delete(key);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{site}/{name}")
    public ResponseEntity<String> update(@PathVariable("site") String site,
                                         @PathVariable("name") String name,
                                         @RequestParam("file") MultipartFile file) throws Exception {
        String key = site + "-" + name;
        storageService.upload(key, file);
        return ResponseEntity.ok(key);
    }
}
