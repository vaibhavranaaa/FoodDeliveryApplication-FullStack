package in.vaibhav.fooddeliveryapi.service;

import in.vaibhav.fooddeliveryapi.entity.FoodEntity;
import in.vaibhav.fooddeliveryapi.io.FoodRequest;
import in.vaibhav.fooddeliveryapi.io.FoodResponse;
import in.vaibhav.fooddeliveryapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            String filename =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(filename),
                    StandardCopyOption.REPLACE_EXISTING
            );

            return filename;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(request);

        String imageUrl = uploadFile(file);

        newFoodEntity.setImageURL(imageUrl);

        newFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();

        return databaseEntries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {

        FoodEntity existingFood = foodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Food not found for id " + id));

        return convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String filename) {

        try {
            Path filePath = Paths.get("uploads", filename);
            return Files.deleteIfExists(filePath);

        } catch (IOException e) {
            return false;
        }
    }

    @Override
    public void deleteFood(String id) {

        FoodResponse response = readFood(id);

        String filename = response.getImageUrl();

        boolean isFileDeleted = deleteFile(filename);

        if (isFileDeleted) {
            foodRepository.deleteById(response.getId());
        }
    }

    private FoodEntity convertToEntity(FoodRequest request) {

        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {

        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageURL())
                .build();
    }
}