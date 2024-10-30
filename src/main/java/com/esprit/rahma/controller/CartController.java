package com.buyfurn.Buyfurn.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.buyfurn.Buyfurn.model.Cart;
import com.buyfurn.Buyfurn.service.CartService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class CartController {

    @Autowired
    CartService cartService;

    @GetMapping("/addToCart/{productId}/{quantity}")
    public Cart addToCart(Principal principal, @PathVariable long productId,@PathVariable int quantity) {
        return cartService.addToCart(principal, productId,quantity);
    }
    
    
    @GetMapping("/getCartDetails")
    public List<Cart> getCartDetails(Principal principal) {
    	return cartService.getCartDetails(principal);
    }
   
    @DeleteMapping("/deleteCartProduct/{cartId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartId) {
        boolean isDeleted = cartService.deleteCartItem(cartId);
        
        if (isDeleted) {
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }
    }

   

}
