package com.homeaway.services;

import java.util.List;

import com.homeaway.DTO.UserDTO;
import com.homeaway.DTO.UserDTOWithProperties;
import com.homeaway.DTO.UserLoginDTO;
import com.homeaway.DTO.UserLoginResponseDTO;
import com.homeaway.DTO.UserRegisterDTO;
import com.homeaway.pojo.User;

public interface UserServices {
	public boolean addUser(UserRegisterDTO u);
	public List<UserDTO> getAllUsers();
	public UserLoginResponseDTO loginUser(String username, String password);
//	public UserDTO loginUser(String username, String password);
	public UserDTOWithProperties getUserById(Long id);
	public boolean forgetPassword(UserLoginDTO userDTO);
}
