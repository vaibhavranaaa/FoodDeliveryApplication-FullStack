package in.vaibhav.fooddeliveryapi.repository;

import in.vaibhav.fooddeliveryapi.entity.OrderEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity,String>{
    List<OrderEntity> findByUserId(String userId);
    Optional<OrderEntity>findByRazorpayOrderId(String razorpayOrderId);

}

