package com.alibabos.image.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;

public interface StorageService {
    String upload(String key, MultipartFile file) throws Exception;
    InputStream download(String key) throws Exception;
    void delete(String key) throws Exception;
}