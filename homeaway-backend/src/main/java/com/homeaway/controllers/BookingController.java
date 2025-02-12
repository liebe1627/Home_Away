package com.homeaway.controllers;

import java.util.List;

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

import com.homeaway.DTO.BookingDTO;
import com.homeaway.DTO.BookingDisplayDTO;
import com.homeaway.customException.NoBookingFound;
import com.homeaway.customException.NoBookingYetException;
import com.homeaway.customException.NoPropertiesFound;
import com.homeaway.services.BookingServices;

@RestController
@RequestMapping("/booking")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookingController {
	
	@Autowired
	BookingServices bservices;
	
	@PostMapping("/addBooking")
	public ResponseEntity<?> addBooking(@RequestBody BookingDTO bookingDTO) throws NoPropertiesFound{
		try {			
			boolean added=bservices.addBooking(bookingDTO);
			if(added) {
				return ResponseEntity.ok(added);
			}
			else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
			}
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
	@GetMapping("/getAllBookings")
	public ResponseEntity<?> getAllBookings(){
		return ResponseEntity.ok(bservices.getAllBookings());
	}
	
	@GetMapping("/getBookingsByUserId/{userId}")
	public ResponseEntity<?> getBookingsByUserId(@PathVariable Long userId) {
		try {
			List<BookingDisplayDTO> userBookings = bservices.getBookingsByUserId(userId);
			return ResponseEntity.ok(userBookings);
		}
		catch(NoBookingYetException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Bookings Yet");
			
		}
	}
	
	@GetMapping("/getBookingsByOwnerId/{userId}")
	public ResponseEntity<?> getBookingsByOwnerId(@PathVariable Long userId) {
		try {
			List<BookingDisplayDTO> userBookings = bservices.getBookingsByOwnerId(userId);
			return ResponseEntity.ok(userBookings);
		}
		catch(NoBookingYetException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Bookings Yet");
			
		}
	}
	
	@PutMapping("/updateBookingStatus/{bookingId}")
	public ResponseEntity<?> updateBookingStatus(@PathVariable Long bookingId){
		try {
			boolean status= bservices.updateBookingStatus(bookingId);
			return ResponseEntity.ok(status);
		}
		catch(NoBookingFound ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		}
	}
	
	
}
