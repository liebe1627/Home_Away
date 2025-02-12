package com.homeaway.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.homeaway.DTO.FacilitiesDTO;
import com.homeaway.DTO.PropertListDTO;
import com.homeaway.DTO.PropertyDTO;
import com.homeaway.customException.NoPropertiesFound;

public interface PropertyServices {
	public boolean addProperty(PropertyDTO property);
//	public List<PropertListDTO> getAllProperties();
	public Page<PropertListDTO> getAllProperties(Pageable page);
//	public List<PropertListDTO> getPropertiesById(Long id) throws NoPropertiesFound;
	public Page<PropertListDTO> getPropertiesById(Long id,Pageable page) throws NoPropertiesFound;
	public List<FacilitiesDTO> getAllFacilities();
	public PropertListDTO getPropertyById(Long id) throws NoPropertiesFound;
	public Page<PropertListDTO> searchProperties(String searchQuery, Pageable pageable);
	public boolean deleteProperty(Long id);
}
