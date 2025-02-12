package com.homeaway.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.homeaway.pojo.Property;
import com.homeaway.pojo.User;

public interface PropertyDao extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property>{
//	public List<Property> findByOwner(User u);
	public Page<Property> findByOwner(User u, Pageable pageable);
//	public List<Property> findAll() //The Find All is pre difened we modify its bejhaviour this line is not required
	public Page<Property> findAll(Pageable pageable);
	public List<Property> findByOwner(User owner);
}
