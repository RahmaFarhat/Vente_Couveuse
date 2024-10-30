package com.buyfurn.Buyfurn.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buyfurn.Buyfurn.model.Cart;
import com.buyfurn.Buyfurn.model.Product;
import com.buyfurn.Buyfurn.model.User;
import com.buyfurn.Buyfurn.repository.CartRepostitory;
import com.buyfurn.Buyfurn.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    CartRepostitory cartRepostitory;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserService userService;

    public Cart addToCart(Principal principal, long productId,int quantity) {
        Product product = productRepository.findById(productId).get();
        String username = principal.getName();
        User user = userService.getUser(username);
        
        if (user != null && product != null) {
            Optional<Cart> existingCart = cartRepostitory.findByUserAndProduct(user, product);

            if (existingCart.isPresent()) {
                Cart cart = existingCart.get();
                cart.setQuantity(cart.getQuantity() + quantity);
                cartRepostitory.save(cart);
                return cart;
            } else {
                Cart cart = new Cart(product, user);
                cart.setQuantity(quantity);
                cartRepostitory.save(cart);
                return cart;
            }
        }

        return null;
    }
  
    public List<Cart> getCartDetails(Principal principal){
    	
    	if(principal!=null) {
    		String username = principal.getName();
    		User user = userService.getUser(username);
    		if(user!=null) {
    			return cartRepostitory.findByUser(user);
    		}
    	}
        return null;
    }

    public boolean deleteCartItem(Long cartId) {
        if (cartRepostitory.existsById(cartId))
        {
        	
            cartRepostitory.deleteById(cartId);
            return true; 
        } else {
            return false; 
        }
    }


}
