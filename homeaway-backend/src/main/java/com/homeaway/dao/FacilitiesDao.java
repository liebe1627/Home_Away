package com.homeaway.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeaway.pojo.Facilities;

public interface FacilitiesDao extends JpaRepository<Facilities, Long>{
	public Optional<Facilities> findByName(String name);

}
