package com.homeaway.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.homeaway.DTO.PropertyDTO;
import com.homeaway.DTO.UserDTO;
import com.homeaway.DTO.UserDTOWithProperties;
import com.homeaway.DTO.UserLoginDTO;
import com.homeaway.DTO.UserLoginResponseDTO;
import com.homeaway.DTO.UserRegisterDTO;
import com.homeaway.customException.UserNotFound;
import com.homeaway.customException.UsernameAlreadyExists;
import com.homeaway.dao.UserDao;
import com.homeaway.pojo.Facilities;
import com.homeaway.pojo.Property;
import com.homeaway.pojo.User;
import com.homeaway.utils.JwtUtil;

@Transactional
@Service
public class UserServiceImpl implements UserServices {
	
	@Autowired
	UserDao userdao;
	@Autowired
	ModelMapper model;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	JwtUtil jwtUtil;
	

//	@Override
//	public boolean addUser(UserRegisterDTO u) {
//		System.out.println(u.toString()+" "+u.getUtype());
//		User usern= userdao.findByUsername(u.getUsername());
//		if(usern!=null) {
//			throw new UsernameAlreadyExists("The Username Already Exists please Try Again");
//		}
//		else {
//			User us = model.map(u, User.class);
//			User user= userdao.save(us);
//			System.out.println(user);
//			return true;
//		}
//	}
	
	@Override
	public boolean addUser(UserRegisterDTO u) {
		System.out.println(u.toString()+" "+u.getUtype());
		User usern= userdao.findByUsername(u.getUsername());
		if(usern!=null) {
			throw new UsernameAlreadyExists("The Username Already Exists please Try Again");
		}
		else {
			u.setPassword(encoder.encode(u.getPassword()));
			User us = model.map(u, User.class);
			User user= userdao.save(us);
			return true;
		}
	}


	@Override
	public List<UserDTO> getAllUsers() {
		return userdao.findAll().stream().map(user->model.map(user, UserDTO.class)).collect(Collectors.toList());
	}


//	@Override
//	public UserDTO loginUser(String username, String password) {
//		User user= userdao.findByUsernameAndPassword(username, password);
//		if(user!=null) {
//			return model.map(user, UserDTO.class);
//		}
//		else {
//			throw new UserNotFound("The user with the specifoed username and password was not found");
//		}
//	}
	
	@Override
	public UserLoginResponseDTO loginUser(String username, String password) {
//		System.out.println(username + " " + password);
		User user= userdao.findByUsername(username);
//		System.out.println(user);
		if(user!=null && encoder.matches(password, user.getPassword())) {
//			System.out.println(encoder.matches(password, user.getPassword()));
//			System.out.println("true");
			String token = jwtUtil.generateToken(username);
		    UserDTO userDTO = model.map(user, UserDTO.class);
		    return new UserLoginResponseDTO(userDTO, token);
		}
		else {
			return null;
		}
	}


	@Override
	public UserDTOWithProperties getUserById(Long id) {
		Optional<User> userOptional = userdao.findById(id);
	    
	    if (!userOptional.isPresent()) {
	        throw new UserNotFound("The user with specified id was not found");
	    }

	    User user = userOptional.get();
	    
	    // Manually map the User entity to UserDTO
	    UserDTOWithProperties userDTO = new UserDTOWithProperties();
	    userDTO.setId(user.getId());
	    userDTO.setName(user.getName());
	    userDTO.setUsername(user.getUsername());
	    userDTO.setNumber(user.getNumber());
	    userDTO.setEmail(user.getEmail());
	    userDTO.setUtype(user.getUtype());
	    
	    List<PropertyDTO> propertyDTOList = new ArrayList<>();
	    
	    for (Property property : user.getProperties()) {
	        PropertyDTO propertyDTO = new PropertyDTO();
	        propertyDTO.setName(property.getName());
	        propertyDTO.setCity(property.getCity());
	        propertyDTO.setState(property.getState());
	        propertyDTO.setAdd1(property.getAdd1());
	        propertyDTO.setAdd2(property.getAdd2());
	        propertyDTO.setRent(property.getRent());
	        propertyDTO.setOwner(property.getOwner().getId()); 
	        
	        List<String> facilities = new ArrayList<>();
	        for (Facilities facility : property.getFacilities()) {
	            facilities.add(facility.getName()); 
	        }
	        propertyDTO.setFacilities(facilities);
	        
	        propertyDTOList.add(propertyDTO);
	    }

	    userDTO.setProperties(propertyDTOList);
	    return userDTO;
		
	}


	@Override
	public boolean forgetPassword(UserLoginDTO userDTO) {
		System.out.println(userDTO.toString());
	    
	    User u = userdao.findByUsername(userDTO.getUsername());
	    if (u == null) {
	        System.out.println("User not found");
	        return false;
	    }

	    // Set the new password correctly
	    u.setPassword(encoder.encode(userDTO.getPassword()));

	    // Save the updated user
	    userdao.save(u);

	    return true;
		
	}

}
