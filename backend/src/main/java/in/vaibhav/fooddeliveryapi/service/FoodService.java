package in.vaibhav.fooddeliveryapi.service;

import in.vaibhav.fooddeliveryapi.io.FoodRequest;
import in.vaibhav.fooddeliveryapi.io.FoodResponse;
import in.vaibhav.fooddeliveryapi.repository.FoodRepository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;




public interface FoodService {

    String uploadFile(MultipartFile file);
    FoodResponse addFood(FoodRequest request,MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    boolean deleteFile(String filename);

    void deleteFood(String id);


}
