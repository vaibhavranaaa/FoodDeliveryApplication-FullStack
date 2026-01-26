package in.vaibhav.fooddeliveryapi.service;

import in.vaibhav.fooddeliveryapi.io.CartRequest;
import in.vaibhav.fooddeliveryapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);

}
