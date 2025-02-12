package com.homeaway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.homeaway.DTO.PropertListDTO;
import com.homeaway.DTO.PropertyDTO;
import com.homeaway.customException.NoPropertiesFound;
import com.homeaway.customException.UserNotFound;
import com.homeaway.services.PropertyServices;

@RestController
@RequestMapping("/property")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PropertyController {
	
	@Autowired
	PropertyServices pservices;
	
//	@GetMapping("/getAllProperties")
//	public ResponseEntity<?> getAllProperties(){
//		List<PropertListDTO> properties = pservices.getAllProperties();
//	    return ResponseEntity.ok(properties);
//	}
	
	@GetMapping("/getAllProperties")
	public ResponseEntity<?> getAllProperties(Pageable pageable){
		Page<PropertListDTO> properties = pservices.getAllProperties(pageable);
	    return ResponseEntity.ok(properties);
	}
	
	@PostMapping("/addProperty")
	public ResponseEntity<?> addNewProperty(@RequestBody PropertyDTO pdto){
		System.out.println(pdto.toString());
		try {			
			boolean added=pservices.addProperty(pdto);
			if(added) {
				return ResponseEntity.ok(true);
			}
			else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
			}
		}
		catch(UserNotFound e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
//	@PostMapping("/getPropertiesByUserId/{userid}")
//	public ResponseEntity<?> getPropertiesByUserId(@PathVariable Long userid) throws NoPropertiesFound{
//		try {
//			List<PropertListDTO> props = pservices.getPropertiesById(userid);
//			if(props.size()>0) {
//				return ResponseEntity.ok(props);
//			}
//			else {
//				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You have not lited any property yet");
//			}
//		}
//		catch(RuntimeException e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//		}
//	}
	
	@PostMapping("/getPropertiesByUserId/{userid}")
	public ResponseEntity<?> getPropertiesByUserId(@PathVariable Long userid, Pageable pageable) throws NoPropertiesFound{
		try {
			Page<PropertListDTO> props = pservices.getPropertiesById(userid,pageable);
			if(props.getSize()>0) {
				return ResponseEntity.ok(props);
			}
			else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You have not lited any property yet");
			}
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
		}
	}
	
	@GetMapping("/facilities")
	public ResponseEntity<?> getAllFacilities(){
		return ResponseEntity.ok(pservices.getAllFacilities());
	}
	
	@GetMapping("/getPropertyById/{pid}")
	public ResponseEntity<?> getPropertyByPropertyId(@PathVariable Long pid){
		try {
			System.out.println("Recived");
			PropertListDTO pdto = pservices.getPropertyById(pid);
			return ResponseEntity.ok(pdto);
		}
		catch(NoPropertiesFound e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/search")
    public ResponseEntity<Page<PropertListDTO>> searchProperties(@RequestParam String query , Pageable pageable) {
		System.out.println("Rwquest Recived");
        Page<PropertListDTO> result = pservices.searchProperties(query, pageable);
        return ResponseEntity.ok(result);
    }
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteProperty(@PathVariable Long id){
		System.out.println(id);
		boolean deleted = pservices.deleteProperty(id);
		return ResponseEntity.ok(deleted);
	}
}
