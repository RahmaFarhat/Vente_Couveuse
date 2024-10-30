package com.buyfurn.Buyfurn.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;

@Entity
public class OrderDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long orderId;
	private String username;
	private Address address;
	private String contact;
	private String orderStatus;
	private double amount;
	private String transactionId;

	@Column(name = "created_date", updatable = false)
	private LocalDateTime createdDate;

	@PrePersist
	protected void onCreate() {
		this.createdDate = LocalDateTime.now();
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	@ManyToOne
	private Product product;

	@ManyToOne
	private User user;

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public OrderDetails(String username, Address address, String contact, String orderStatus, double amount,
			Product product, User user, String transactionId) {
		this.username = username;
		this.address = address;
		this.contact = contact;
		this.orderStatus = orderStatus;
		this.amount = amount;
		this.product = product;
		this.user = user;
		this.transactionId = transactionId;
	}

	public OrderDetails() {

	}

}
