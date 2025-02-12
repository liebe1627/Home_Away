package com.homeaway.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.homeaway.dao.UserDao;
import com.homeaway.pojo.User;

@Service
public class CustomerUserDetailServices implements UserDetailsService{
	
	@Autowired
	private UserDao udao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> userOptional= Optional.ofNullable(udao.findByUsername(username));
		User u = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		
		return org.springframework.security.core.userdetails.User.builder()
                .username(u.getUsername())
                .password(u.getPassword())
//                .roles("USER") This is used for role based access
                .build();
	}

}
