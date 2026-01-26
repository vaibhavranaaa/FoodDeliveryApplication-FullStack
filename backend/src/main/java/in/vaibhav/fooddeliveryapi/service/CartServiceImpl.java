package in.vaibhav.fooddeliveryapi.service;

import in.vaibhav.fooddeliveryapi.entity.CartEntity;
import in.vaibhav.fooddeliveryapi.io.CartRequest;
import in.vaibhav.fooddeliveryapi.io.CartResponse;
import in.vaibhav.fooddeliveryapi.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private String getLoggedInUserId() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName(); // email / username from JWT
    }

    @Override
    public CartResponse addToCart(CartRequest request) {

        String userId = getLoggedInUserId();

        CartEntity cart = cartRepository
                .findByUserId(userId)
                .orElse(
                        CartEntity.builder()
                                .userId(userId)
                                .build()
                );

        cart.getItems().put(
                request.getFoodId(),
                cart.getItems().getOrDefault(request.getFoodId(), 0) + 1
        );

        cartRepository.save(cart);
        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {

        String userId = getLoggedInUserId();

        CartEntity cart = cartRepository
                .findByUserId(userId)
                .orElse(
                        CartEntity.builder()
                                .userId(userId)
                                .build()
                );

        return convertToResponse(cart);
    }

    @Override
    public void clearCart() {

        String userId = getLoggedInUserId();
        cartRepository.deleteByUserId(userId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest request) {

        String userId = getLoggedInUserId();

        CartEntity cart = cartRepository
                .findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().computeIfPresent(
                request.getFoodId(),
                (k, v) -> v > 1 ? v - 1 : null
        );

        cartRepository.save(cart);
        return convertToResponse(cart);
    }

    private CartResponse convertToResponse(CartEntity cart) {
        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .items(cart.getItems())
                .build();
    }
}
