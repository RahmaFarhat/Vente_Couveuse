package com.buyfurn.Buyfurn.model;

import java.util.ArrayList;
import java.util.List;

public class OrderInput {
	private String fullName;
	private Address address;
	private String contactNumber;
	private String transactionId;
	
    public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	private List<Orderquantity> orderquantities = new ArrayList<>();
	
	public List<Orderquantity> getOrderquantities() {
		return orderquantities;
	}
	public void setOrderquantities(List<Orderquantity> orderquantities) {
		this.orderquantities = orderquantities;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	
	
	
}
