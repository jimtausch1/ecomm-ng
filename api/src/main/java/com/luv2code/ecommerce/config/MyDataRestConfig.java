package com.luv2code.ecommerce.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;

import jakarta.persistence.EntityManager;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  private EntityManager entityManager;

  @Autowired
  public MyDataRestConfig(EntityManager theEntityManager) {
    entityManager = theEntityManager;
  }

  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
    HttpMethod[] unsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

    disableHttpMethods(Product.class, config, unsupportedActions);
    disableHttpMethods(ProductCategory.class, config, unsupportedActions);
    disableHttpMethods(State.class, config, unsupportedActions);
    disableHttpMethods(Country.class, config, unsupportedActions);

    exposeIds(config);
  }

  private void disableHttpMethods(Class<?> theClass, RepositoryRestConfiguration config,
      HttpMethod[] unsupportedActions) {
    config.getExposureConfiguration()
        .forDomainType(theClass)
        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
  }

  private void exposeIds(RepositoryRestConfiguration config) {
    var entities = entityManager.getMetamodel().getEntities();

    List<Class<?>> entityClasses = new ArrayList<>();

    for (var entity : entities) {
      entityClasses.add(entity.getJavaType());
    }

    Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
    config.exposeIdsFor(domainTypes);
  }

}
