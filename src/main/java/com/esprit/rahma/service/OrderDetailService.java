package com.buyfurn.Buyfurn.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buyfurn.Buyfurn.model.Cart;
import com.buyfurn.Buyfurn.model.OrderDetails;
import com.buyfurn.Buyfurn.model.OrderInput;
import com.buyfurn.Buyfurn.model.Orderquantity;
import com.buyfurn.Buyfurn.model.Product;
import com.buyfurn.Buyfurn.model.TransactionDetails;
import com.buyfurn.Buyfurn.model.User;
import com.buyfurn.Buyfurn.repository.CartRepostitory;
import com.buyfurn.Buyfurn.repository.OrderDetailsRepository;
import com.buyfurn.Buyfurn.repository.ProductRepository;
import com.buyfurn.Buyfurn.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;


@Service
public class OrderDetailService {
	@Autowired
	private OrderDetailsRepository orderDetailsRepository;

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CartRepostitory cartRepostitory;

	@Autowired
	private UserRepository userRepository;
	private final static String ORDER_PLACED = "Placed";
	private final static String ORDER_DELIVERED = "Delivered";

	public List<OrderDetails> placeOrder(OrderInput orderInput, Principal principal, boolean isSingleProductCheckout) {

		List<Orderquantity> orderQuantities = orderInput.getOrderquantities();

		if (orderQuantities == null || orderQuantities.isEmpty()) {
			return null;
		}

		String username = principal.getName();
		User user = userRepository.findByEmail(username);
		List<OrderDetails> placedOrders = new ArrayList<OrderDetails>();
		for (Orderquantity o : orderQuantities) {

			Product product = productRepository.findById(o.getProductId()).get();
			OrderDetails orderDetail = new OrderDetails(
					user.getEmail(),
					orderInput.getAddress(),
					orderInput.getContactNumber(),
					ORDER_PLACED,
					product.getPrice() * o.getQuantity(),
					product, user,
					orderInput.getTransactionId());
			
			orderDetailsRepository.save(orderDetail);
			placedOrders.add(orderDetail);

			
			// empty cart

			if (!isSingleProductCheckout) {
				List<Cart> carts = cartRepostitory.findByUser(user);

				carts.stream().forEach(x -> cartRepostitory.delete(x));
				
			}

		}
		return placedOrders;
	}

	public List<OrderDetails> allOrder(String status) {
		if (status.equals("all")) {
			return orderDetailsRepository.findAll();
		} else {
			return orderDetailsRepository.findByOrderStatus(status);
		}
	}

	public OrderDetails markAsDelivered(long orderId) {
		OrderDetails orderDetails = orderDetailsRepository.findById(orderId).get();
		orderDetails.setOrderStatus(ORDER_DELIVERED);
		return orderDetailsRepository.save(orderDetails);
	}

	public List<OrderDetails> myOrders(Principal principal) {
		String username = principal.getName();
		User user = userRepository.findByEmail(username);
		return orderDetailsRepository.findByUser(user);
	}

	private static final String KEY = "rzp_test_TOGAyR5vOJ3zVE";
	private static final String KEY_SECRET = "G8brcbnHhqpJqMM8GmbqXUZ6";
	private static final String CURRENCY = "INR";

	public TransactionDetails createTransaction(double amout) {
		try {
			
			JSONObject jsonObject=new JSONObject();
			jsonObject.put("amount", (amout*100));
			jsonObject.put("currency", CURRENCY);
			
			RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
			
			Order order = razorpayClient.orders.create(jsonObject);
			return prepareTransactionDetials(order);
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;

	}
	
	
	//imp details that we want on UI
	
	private TransactionDetails prepareTransactionDetials(Order order) {
		String orderId=order.get("id");
		String currency=order.get("currency");
		Integer amount=order.get("amount");
		
		TransactionDetails transaction=new TransactionDetails(orderId, currency, amount,KEY);
		return transaction;
	}
}
