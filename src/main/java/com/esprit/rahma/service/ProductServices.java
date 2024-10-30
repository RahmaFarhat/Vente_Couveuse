package com.buyfurn.Buyfurn.service;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.buyfurn.Buyfurn.model.Cart;
import com.buyfurn.Buyfurn.model.Product;
import com.buyfurn.Buyfurn.model.ProductImages;
import com.buyfurn.Buyfurn.model.User;
import com.buyfurn.Buyfurn.repository.CartRepostitory;
import com.buyfurn.Buyfurn.repository.ProductRepository;
import com.buyfurn.Buyfurn.repository.UserRepository;

@Service
public class ProductServices {

	@Autowired
	ProductRepository productRepository;
	@Autowired
	CartRepostitory cartRepostitory;
	@Autowired
	UserRepository userRepository;

	public Product addProduct(Product product, MultipartFile[] images) throws IOException {
		product.setProductImages(uploadImages(images));
		productRepository.save(product);
		return product;
	}

	public List<ProductImages> uploadImages(MultipartFile[] imgs) throws IOException {

		List<ProductImages> productImages = new ArrayList<ProductImages>();

		for (int i = 0; i < imgs.length; i++) {
			ProductImages images = new ProductImages(imgs[i].getOriginalFilename(), imgs[i].getContentType(),
					imgs[i].getBytes());
			productImages.add(images);
		}

		return productImages;
	}

	public List<Product> getAllProducts(int pageNumber, String searchKey, String searchCategory) {
	    Pageable pageable = PageRequest.of(pageNumber, 12);
	    
	    if (searchKey.equals("") && searchCategory.equals("")) {
	        Page<Product> paginatedProducts = productRepository.findAll(pageable);
	        return paginatedProducts.getContent();
	    }
	    else if (!searchCategory.equals("") && searchKey.equals("")) {
	        return productRepository.findByCategory(searchCategory);
	    }
	    else if (!searchCategory.equals("") && !searchKey.equals("")) {
	        return productRepository.findByTitleContainingIgnoreCaseAndCategory(searchKey, searchCategory).getContent();
	    }
	    else {
	        return productRepository.findByTitleContainingIgnoreCase(searchKey);
	    }
	}


	public Product getById(Long id) {
		return productRepository.findById(id).get();
	}

	public Product updateProduct(Product product, MultipartFile[] image) throws IOException {

	    if (image == null) {
	        image = new MultipartFile[0];
	    }

	    Product newProduct = productRepository.findById(product.getId()).orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));
	    newProduct.setTitle(product.getTitle());
	    newProduct.setColor(product.getColor());
	    newProduct.setCareAndMaintenance(product.getCareAndMaintenance());
	    newProduct.setWeight(product.getWeight());
	    newProduct.setDescription(product.getDescription());
	    newProduct.setSeatingCapacity(product.getSeatingCapacity());
	    newProduct.setPrice(product.getPrice());
	    newProduct.setMaterial(product.getMaterial());
	    newProduct.setStockStatus(product.getStockStatus());
	    newProduct.setCategory(product.getCategory());
	    newProduct.setWarranty(product.getWarranty());

	    if (image.length > 0) {
	        newProduct.setProductImages(uploadImages(image));
	    }

	    productRepository.save(newProduct);
	    return newProduct; // Return the updated product
	}

	public String deleteById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.deleteById(id);
            return "Product Deleted !!";
        } else {
            return "Product not found !!";
        }
    }
	
		public List<Product> getProductDetails(Principal principal,boolean isSingleProductCheckout,long productId) {
			if(isSingleProductCheckout) {
				List<Product> list=new ArrayList<Product>();
				Product product= productRepository.findById(productId).get();
				list.add(product);
				return list;
				
			}
			else
			{
				
				String username=principal.getName();
				
				User user=userRepository.findByEmail(username);
				
				List<Cart> carts= cartRepostitory.findByUser(user);
				
				List<Product> products =carts.stream().map(x->x.getProduct()).collect(Collectors.toList());
				
				return products;
			}
			
		}
		

	    public List<Product> getLatestProducts() {
	        Pageable pageable = PageRequest.of(0, 8); // Page index starts at 0, size = 8
	        return productRepository.findTop8ByOrderByCreatedDateDesc(pageable);
	    }
}
