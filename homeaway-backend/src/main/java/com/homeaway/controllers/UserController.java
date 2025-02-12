package com.homeaway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeaway.DTO.UserDTO;
import com.homeaway.DTO.UserDTOWithProperties;
import com.homeaway.DTO.UserLoginDTO;
import com.homeaway.DTO.UserLoginResponseDTO;
import com.homeaway.DTO.UserRegisterDTO;
import com.homeaway.customException.UserNotFound;
import com.homeaway.customException.UsernameAlreadyExists;
import com.homeaway.pojo.User;
import com.homeaway.services.UserServices;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
	
	@Autowired
	UserServices userService;
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok(userService.getAllUsers());
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> addNewUser(@RequestBody UserRegisterDTO u){
		System.out.println(u.toString());
		System.out.println("Request Recived");
		try {
			boolean userAdded=userService.addUser(u);
			if(userAdded) {				
				return ResponseEntity.ok(true);
			}
			else {
				return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
			}
		}
		catch(UsernameAlreadyExists e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("The user with this username already exists");
		}
	}
	
//	@PostMapping("/register")
//	public void addNewUser(@RequestBody UserDTO u){
//		System.out.println(u);
//	}
//	
	@PostMapping("/userLogin")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginDTO user){
		try {
			System.out.println(user.getPassword());
			UserLoginResponseDTO u = userService.loginUser(user.getUsername(), user.getPassword());
//			UserDTO u = userService.loginUser(user.getUsername(), user.getPassword());
			System.out.println(u);
			return ResponseEntity.ok(u);
			
		}
		catch(UserNotFound e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
		}
	}
	
	@GetMapping("/userById/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Long id){
		try {
			UserDTOWithProperties u = userService.getUserById(id);
				return ResponseEntity.ok(u);
		}
		catch (UserNotFound e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
			
		}
	}
	
	@PutMapping("/forgetPassword")
	public ResponseEntity<?> forgetPassword(@RequestBody UserLoginDTO forget){
		try {
			boolean changed= userService.forgetPassword(forget);
			return ResponseEntity.ok(changed);
		}
		catch(UserNotFound ex) {
			System.out.println(ex.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
		}
	}
}
