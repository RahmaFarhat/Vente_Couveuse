package com.buyfurn.Buyfurn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.buyfurn.Buyfurn.model.Cart;
import com.buyfurn.Buyfurn.model.OrderDetails;
import com.buyfurn.Buyfurn.model.User;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
	public List<OrderDetails> findByUser(User user);

    List<OrderDetails> findByOrderStatus(String orderStatus);

}
