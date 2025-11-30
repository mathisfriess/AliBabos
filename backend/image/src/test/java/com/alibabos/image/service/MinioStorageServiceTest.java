package com.alibabos.image.service;

import io.minio.*;
import io.minio.messages.Bucket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MinioStorageServiceTest {

    @Mock
    private MinioClient minioClient;

    private MinioStorageService storageService;

    private final String bucketName = "test-bucket";

    @BeforeEach
    void setUp() {
        storageService = new MinioStorageService(minioClient, bucketName);
    }

    @Test
    void ensureBucket_shouldCreateBucket_whenNotFound() throws Exception {
        when(minioClient.listBuckets()).thenReturn(Collections.emptyList());

        storageService.ensureBucket();

        ArgumentCaptor<MakeBucketArgs> captor = ArgumentCaptor.forClass(MakeBucketArgs.class);
        verify(minioClient).makeBucket(captor.capture());
        assertEquals(bucketName, captor.getValue().bucket());
    }

    @Test
    void ensureBucket_shouldNotCreateBucket_whenFound() throws Exception {
        Bucket bucket = mock(Bucket.class);
        when(bucket.name()).thenReturn(bucketName);
        when(minioClient.listBuckets()).thenReturn(List.of(bucket));

        storageService.ensureBucket();

        verify(minioClient, never()).makeBucket(any(MakeBucketArgs.class));
    }

    @Test
    void upload_shouldCallPutObject() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "content".getBytes()
        );
        String key = "test-key";

        storageService.upload(key, file);

        ArgumentCaptor<PutObjectArgs> captor = ArgumentCaptor.forClass(PutObjectArgs.class);
        verify(minioClient).putObject(captor.capture());

        PutObjectArgs args = captor.getValue();
        assertEquals(bucketName, args.bucket());
        assertEquals(key, args.object());
        assertEquals(file.getContentType(), args.contentType());
    }

    @Test
    void download_shouldCallGetObject() throws Exception {
        String key = "test-key";
        GetObjectResponse response = new GetObjectResponse(null, bucketName, null, key, new ByteArrayInputStream("data".getBytes()));
        when(minioClient.getObject(any(GetObjectArgs.class))).thenReturn(response);

        InputStream result = storageService.download(key);

        assertNotNull(result);
        ArgumentCaptor<GetObjectArgs> captor = ArgumentCaptor.forClass(GetObjectArgs.class);
        verify(minioClient).getObject(captor.capture());

        GetObjectArgs args = captor.getValue();
        assertEquals(bucketName, args.bucket());
        assertEquals(key, args.object());
    }

    @Test
    void delete_shouldCallRemoveObject() throws Exception {
        String key = "test-key";

        storageService.delete(key);

        ArgumentCaptor<RemoveObjectArgs> captor = ArgumentCaptor.forClass(RemoveObjectArgs.class);
        verify(minioClient).removeObject(captor.capture());

        RemoveObjectArgs args = captor.getValue();
        assertEquals(bucketName, args.bucket());
        assertEquals(key, args.object());
    }
}
