package com.buyfurn.Buyfurn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.buyfurn.Buyfurn.model.Cart;
import com.buyfurn.Buyfurn.model.Product;
import com.buyfurn.Buyfurn.model.User;

public interface CartRepostitory extends JpaRepository<Cart, Long> {
		public List<Cart> findByUser(User user);

		public Optional<Cart> findByUserAndProduct(User user, Product product);

		
}
