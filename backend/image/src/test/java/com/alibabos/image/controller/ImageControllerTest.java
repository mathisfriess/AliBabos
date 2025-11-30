package com.alibabos.image.controller;

import com.alibabos.image.service.StorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ImageControllerTest {

    @Mock
    private StorageService storageService;

    @InjectMocks
    private ImageController imageController;

    @Test
    void upload_shouldReturnOk_whenFileIsValid() throws Exception {
        String site = "mysite";
        String name = "myimage";
        String key = site + "-" + name;
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "content".getBytes());

        when(storageService.upload(eq(key), any(MultipartFile.class))).thenReturn(key);

        ResponseEntity<String> response = imageController.upload(file, site, name);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("mysite/myimage", response.getBody());
        verify(storageService).upload(eq(key), any(MultipartFile.class));
    }

    @Test
    void download_shouldReturnImage_whenKeyExists() throws Exception {
        String site = "mysite";
        String name = "myimage";
        String key = site + "-" + name;
        byte[] content = "image content".getBytes();
        InputStream inputStream = new ByteArrayInputStream(content);

        when(storageService.download(key)).thenReturn(inputStream);

        ResponseEntity<byte[]> response = imageController.download(site, name);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertArrayEquals(content, response.getBody());
        assertEquals("inline; filename=\"" + key + "\"", response.getHeaders().getContentDisposition().toString());
        verify(storageService).download(key);
    }

    @Test
    void delete_shouldReturnNoContent() throws Exception {
        String site = "mysite";
        String name = "myimage";
        String key = site + "-" + name;

        doNothing().when(storageService).delete(key);

        ResponseEntity<Void> response = imageController.delete(site, name);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(storageService).delete(key);
    }

    @Test
    void update_shouldReturnOk() throws Exception {
        String site = "mysite";
        String name = "myimage";
        String key = site + "-" + name;
        MockMultipartFile file = new MockMultipartFile("file", "update.jpg", "image/jpeg", "updated content".getBytes());

        when(storageService.upload(eq(key), any(MultipartFile.class))).thenReturn(key);

        ResponseEntity<String> response = imageController.update(site, name, file);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(key, response.getBody());
        verify(storageService).upload(eq(key), any(MultipartFile.class));
    }
}
