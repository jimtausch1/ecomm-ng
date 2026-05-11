package com.luv2code.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
    HttpMethod[] unsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

    config.getExposureConfiguration()
        .forDomainType(Product.class)
        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));

    config.getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
  }

}
