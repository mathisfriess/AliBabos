package com.alibabos.image.service;

import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.Bucket;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class MinioStorageService implements StorageService {

    private final MinioClient minioClient;
    private final String bucket;

    public MinioStorageService(MinioClient minioClient, @Value("${app.minio.bucket}") String bucket) {
        this.minioClient = minioClient;
        this.bucket = bucket;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void ensureBucket() throws Exception {
        boolean found = minioClient.listBuckets().stream()
                .map(Bucket::name)
                .anyMatch(bucket::equals);
        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
        }
    }

    @Override
    public String upload(String key, MultipartFile file) throws Exception {
        try (InputStream in = file.getInputStream()) {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(key)
                            .stream(in, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());
        }
        return key;
    }

    @Override
    public InputStream download(String key) throws Exception {
        return minioClient.getObject(GetObjectArgs.builder()
                .bucket(bucket)
                .object(key)
                .build());
    }

    @Override
    public void delete(String key) throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(bucket)
                .object(key)
                .build());
    }
}
