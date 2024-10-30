package com.buyfurn.Buyfurn.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.buyfurn.Buyfurn.model.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	 @Query("SELECT p FROM Product p ORDER BY p.createdDate DESC")
	    List<Product> findTop8ByOrderByCreatedDateDesc(Pageable pageable);

	 	
	  Page<Product> findAll(Pageable pageable);
	  
	  
	  List<Product> findByTitle(String title);

	  List<Product> findByTitleContainingIgnoreCase(String searchKey);

	  List<Product> findByCategory(String searchCategory);


	Slice<Product> findByTitleContainingIgnoreCaseAndCategory(String searchKey, String searchCategory);
}
