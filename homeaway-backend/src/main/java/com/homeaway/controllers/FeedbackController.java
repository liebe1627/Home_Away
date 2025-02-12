package com.homeaway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeaway.DTO.FeedbackDTO;
import com.homeaway.services.FeedbackServices;

@RestController
@RequestMapping("/feedbacks")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FeedbackController {
	@Autowired
	FeedbackServices fserveices;
	
	@PostMapping("/addNewFeedback")
	public ResponseEntity<?> addNewFeedback(@RequestBody FeedbackDTO f){
		System.out.println(f.toString());
		return ResponseEntity.ok(fserveices.addFeedback(f));
	}
	
	@GetMapping("/getAllFeedback")
	public ResponseEntity<?> getAllFeedbacks(){
		return ResponseEntity.ok(fserveices.getAllFeedback());
	}
}
