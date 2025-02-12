package com.homeaway.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeaway.pojo.User;


public interface UserDao extends JpaRepository<User, Long> {
	public User findByUsername(String username);
	public User findByUsernameAndPassword(String username, String password);

}
