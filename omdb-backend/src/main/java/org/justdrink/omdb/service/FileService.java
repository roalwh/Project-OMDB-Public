package org.justdrink.omdb.service;

import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Files;
import org.justdrink.omdb.repository.FilesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FilesRepository filesRepository;

    @Transactional
    public List<String> findFilesName(Long bid) {
        List<Files> filesList = filesRepository.findByBoard_Bid(bid);
        List<String> filesPaths = new ArrayList<>();

        for (Files file : filesList) {
            filesPaths.add(file.getSavename());
        }

        return filesPaths;
    }


}
