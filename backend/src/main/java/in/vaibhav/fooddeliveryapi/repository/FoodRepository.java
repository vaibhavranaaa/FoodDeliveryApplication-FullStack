package in.vaibhav.fooddeliveryapi.repository;

import in.vaibhav.fooddeliveryapi.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository


public interface FoodRepository extends MongoRepository<FoodEntity,String> {

}
