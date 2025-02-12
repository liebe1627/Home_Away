package com.homeaway.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeaway.pojo.Bookings;
import com.homeaway.pojo.Property;
import com.homeaway.pojo.User;

public interface BookingsDao extends JpaRepository<Bookings, Long>{
	public List<Bookings> findByUserId(User user);
	public List<Bookings> findByPropertyId(Property property);
}
