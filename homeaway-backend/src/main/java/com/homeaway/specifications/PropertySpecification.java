package com.homeaway.specifications;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.homeaway.pojo.Property;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class PropertySpecification implements Specification<Property>{

	//Single search Parameters
//	private String searchQuery;
//
//    public PropertySpecification(String searchQuery) {
//        this.searchQuery = searchQuery.toLowerCase();
//    }
//
//    @Override
//    public Predicate toPredicate(Root<Property> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
//        List<Predicate> predicates = new ArrayList<>();
//
//        // Search in multiple fields
//        predicates.add(cb.like(cb.lower(root.get("name")), "%" + searchQuery + "%"));
//        predicates.add(cb.like(cb.lower(root.get("city")), "%" + searchQuery + "%"));
//        predicates.add(cb.like(cb.lower(root.get("state")), "%" + searchQuery + "%"));
//        predicates.add(cb.like(cb.lower(root.get("add1")), "%" + searchQuery + "%"));
//        predicates.add(cb.like(cb.lower(root.get("add2")), "%" + searchQuery + "%"));
//        predicates.add(cb.like(cb.lower(root.get("rent").as(String.class)), "%" + searchQuery + "%"));
//        
//        //Search based of facility
//        Join<Object, Object> facilitiesJoin = root.join("facilities", JoinType.LEFT);
//        predicates.add(cb.like(cb.lower(facilitiesJoin.get("name")), "%" + searchQuery + "%"));
//
//        return cb.or(predicates.toArray(new Predicate[0])); // Combine all with OR condition
//    }
	
	//Multiple Search Parameters
	private List<String> searchTerms;

    public PropertySpecification(String searchQuery) {
        // Split search query into words and store them as a list
        this.searchTerms = Arrays.asList(searchQuery.toLowerCase().split("\\s+"));
    }

    @Override
    public Predicate toPredicate(Root<Property> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        
        Join<Object, Object> facilitiesJoin = root.join("facilities", JoinType.LEFT);

        
        for (String term : searchTerms) {
            List<Predicate> termPredicates = new ArrayList<>();

            termPredicates.add(cb.like(cb.lower(root.get("name")), "%" + term + "%"));
            termPredicates.add(cb.like(cb.lower(root.get("city")), "%" + term + "%"));
            termPredicates.add(cb.like(cb.lower(root.get("state")), "%" + term + "%"));
            termPredicates.add(cb.like(cb.lower(root.get("add1")), "%" + term + "%"));
            termPredicates.add(cb.like(cb.lower(root.get("add2")), "%" + term + "%"));
            termPredicates.add(cb.like(cb.lower(root.get("rent").as(String.class)), "%" + term + "%"));
            termPredicates.add(cb.like(cb.lower(facilitiesJoin.get("name")), "%" + term + "%")); 

            // Group all OR conditions for this term
            predicates.add(cb.or(termPredicates.toArray(new Predicate[0])));
        }

        return cb.and(predicates.toArray(new Predicate[0])); 
    }

}
