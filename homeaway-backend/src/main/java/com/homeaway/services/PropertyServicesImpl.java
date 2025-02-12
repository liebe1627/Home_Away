package com.homeaway.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.homeaway.DTO.FacilitiesDTO;
import com.homeaway.DTO.PropertListDTO;
import com.homeaway.DTO.PropertyDTO;
import com.homeaway.customException.NoPropertiesFound;
import com.homeaway.customException.UserNotFound;
import com.homeaway.dao.BookingsDao;
import com.homeaway.dao.FacilitiesDao;
import com.homeaway.dao.PropertyDao;
import com.homeaway.dao.UserDao;
import com.homeaway.pojo.Bookings;
import com.homeaway.pojo.Facilities;
import com.homeaway.pojo.Property;
import com.homeaway.pojo.User;
import com.homeaway.specifications.PropertySpecification;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class PropertyServicesImpl implements PropertyServices {

	@Autowired
	PropertyDao pdao;
	@Autowired
	FacilitiesDao fdao;
	@Autowired
	UserDao udao;
	@Autowired
	ModelMapper model;
	@Autowired
	BookingsDao bdao;

	@Override
	public boolean addProperty(PropertyDTO property) {

		Property prop = new Property();

		prop.setAdd1(property.getAdd1());
		prop.setAdd2(property.getAdd2());
		prop.setCity(property.getCity());
		prop.setState(property.getState());
		prop.setName(property.getName());
		prop.setRent(property.getRent());

		User u = udao.findById(property.getOwner())
				.orElseThrow(() -> new UserNotFound("The User with the specified owner id was not found"));
		prop.setOwner(u);

		List<Facilities> facilities = new ArrayList<>();
		for (String fname : property.getFacilities()) {
			Facilities f = fdao.findByName(fname).orElseGet(() -> {
				Facilities newf = new Facilities();
				newf.setName(fname);
				return fdao.save(newf);
			});
			facilities.add(f);
		}

		prop.setFacilities(facilities);
		Property p = pdao.save(prop);
		if (p != null) {
			return true;
		} else {
			return false;
		}

	}

//	@Override
//	public List<PropertListDTO> getAllProperties() {
//		List<Property> prop = pdao.findAll();
//		List<PropertListDTO> pdto=new ArrayList<>();
//		
//		for(Property p : prop) {
//			PropertListDTO pldto=new PropertListDTO();
//			pldto.setId(p.getId());
//			pldto.setAdd1(p.getAdd1());
//			pldto.setAdd2(p.getAdd2());
//			pldto.setCity(p.getCity());
//			pldto.setState(p.getState());
//			pldto.setName(p.getName());
//			pldto.setRent(p.getRent());
//			
//			if(p.getOwner()!=null) {
//				pldto.setOwner(p.getOwner().getId());
//			}
//			
//			List<FacilitiesDTO> fdto = p.getFacilities().stream().map(facilities->new FacilitiesDTO(facilities.getId(), facilities.getName())).collect(Collectors.toList());
//			pldto.setFacilities(fdto);
//			pdto.add(pldto);
//			
//		}
////		System.out.println(pdto.toString());
//		return pdto;
//	}
	@Override
	public Page<PropertListDTO> getAllProperties(Pageable pageable) {
		Page<Property> propPage = pdao.findAll(pageable); // Fetch paginated data
		List<PropertListDTO> pdto = propPage.getContent().stream().map(p -> {
			PropertListDTO pldto = new PropertListDTO();
			pldto.setId(p.getId());
			pldto.setAdd1(p.getAdd1());
			pldto.setAdd2(p.getAdd2());
			pldto.setCity(p.getCity());
			pldto.setState(p.getState());
			pldto.setName(p.getName());
			pldto.setRent(p.getRent());

			if (p.getOwner() != null) {
				pldto.setOwner(p.getOwner().getId());
			}

			List<FacilitiesDTO> fdto = p.getFacilities().stream()
					.map(facilities -> new FacilitiesDTO(facilities.getId(), facilities.getName()))
					.collect(Collectors.toList());
			pldto.setFacilities(fdto);

			return pldto;
		}).collect(Collectors.toList());

		return new PageImpl<>(pdto, pageable, propPage.getTotalElements()); // Return paginated DTOs
	}

//	@Override
//	public List<PropertListDTO> getPropertiesById(Long id) throws NoPropertiesFound {
//		User user = udao.findById(id).orElseThrow(()-> new UserNotFound("The user with the specified id was not fouund"));
//		List<Property> prop = pdao.findByOwner(user);
//		if (prop.isEmpty()) {
//	        throw new NoPropertiesFound("The user has no properties listed");
//	    }
//		List<PropertListDTO> pdto=new ArrayList<>();
//		
//		for(Property p : prop) {
//			PropertListDTO pldto=new PropertListDTO();
//			pldto.setId(p.getId());
//			pldto.setAdd1(p.getAdd1());
//			pldto.setAdd2(p.getAdd2());
//			pldto.setCity(p.getCity());
//			pldto.setState(p.getState());
//			pldto.setName(p.getName());
//			pldto.setRent(p.getRent());
//			
//			if(p.getOwner()!=null) {
//				pldto.setOwner(p.getOwner().getId());
//			}
//			
//			List<FacilitiesDTO> fdto = p.getFacilities().stream().map(facilities->new FacilitiesDTO(facilities.getId(), facilities.getName())).collect(Collectors.toList());
//			pldto.setFacilities(fdto);
//			pdto.add(pldto);
//			
//		}
////		System.out.println(pdto.toString());
//		return pdto;
//	}

	@Override
	public Page<PropertListDTO> getPropertiesById(Long id, Pageable pageable) throws NoPropertiesFound {
		User user = udao.findById(id)
				.orElseThrow(() -> new UserNotFound("The user with the specified id was not found"));

		Page<Property> propPage = pdao.findByOwner(user, pageable);

		if (propPage.isEmpty()) {
			throw new NoPropertiesFound("The user has no properties listed");
		}

		Page<PropertListDTO> pdtoPage = propPage.map(p -> {
			PropertListDTO pldto = new PropertListDTO();
			pldto.setId(p.getId());
			pldto.setAdd1(p.getAdd1());
			pldto.setAdd2(p.getAdd2());
			pldto.setCity(p.getCity());
			pldto.setState(p.getState());
			pldto.setName(p.getName());
			pldto.setRent(p.getRent());

			if (p.getOwner() != null) {
				pldto.setOwner(p.getOwner().getId());
			}

			List<FacilitiesDTO> fdto = p.getFacilities().stream()
					.map(facilities -> new FacilitiesDTO(facilities.getId(), facilities.getName()))
					.collect(Collectors.toList());
			pldto.setFacilities(fdto);

			return pldto;
		});

		return pdtoPage;
	}

	@Override
	public List<FacilitiesDTO> getAllFacilities() {
		return fdao.findAll().stream().map(facility -> model.map(facility, FacilitiesDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public PropertListDTO getPropertyById(Long id) throws NoPropertiesFound {
		Property p = pdao.findById(id)
				.orElseThrow(() -> new NoPropertiesFound("There is no property with specified id"));
		PropertListDTO pldto = new PropertListDTO();
		pldto.setId(p.getId());
		pldto.setAdd1(p.getAdd1());
		pldto.setAdd2(p.getAdd2());
		pldto.setCity(p.getCity());
		pldto.setState(p.getState());
		pldto.setName(p.getName());
		pldto.setRent(p.getRent());
		
		if (p.getOwner() != null) {
			pldto.setOwner(p.getOwner().getId());
		}
		
		List<FacilitiesDTO> fdto = p.getFacilities().stream().map(f->new FacilitiesDTO(f.getId(),f.getName())).collect(Collectors.toList());
		pldto.setFacilities(fdto);

		return pldto;

	}

	@Override
	public Page<PropertListDTO> searchProperties(String searchQuery, Pageable pageable) {
		Specification<Property> spec = new PropertySpecification(searchQuery);
	    Page<Property> propPage = pdao.findAll(spec, pageable);  // Use Specification with Pagination

	    List<PropertListDTO> pdto = propPage.getContent().stream().map(p -> {
	        PropertListDTO pldto = new PropertListDTO();
	        pldto.setId(p.getId());
	        pldto.setAdd1(p.getAdd1());
	        pldto.setAdd2(p.getAdd2());
	        pldto.setCity(p.getCity());
	        pldto.setState(p.getState());
	        pldto.setName(p.getName());
	        pldto.setRent(p.getRent());

	        if (p.getOwner() != null) {
	            pldto.setOwner(p.getOwner().getId());
	        }

	        List<FacilitiesDTO> fdto = p.getFacilities().stream()
	                .map(facilities -> new FacilitiesDTO(facilities.getId(), facilities.getName()))
	                .collect(Collectors.toList());
	        pldto.setFacilities(fdto);

	        return pldto;
	    }).collect(Collectors.toList());

	    return new PageImpl<>(pdto, pageable, propPage.getTotalElements());
	}

	@Override
	public boolean deleteProperty(Long id) {
		 Optional<Property> propertyOptional = pdao.findById(id);
		    System.out.println(propertyOptional);
		    if (propertyOptional.isPresent()) {
		        Property property = propertyOptional.get();
		        
		        // 1. Remove associations with facilities
		        property.getFacilities().clear();
		        
		        // 2. Remove bookings (if needed)
		        for (Bookings booking : property.getBookings()) {
		        	bdao.delete(booking); // Detach property from bookings
		        }
		        property.getBookings().clear();
		        
		        // 3. Save property changes before deletion
		        pdao.save(property);
		        
		        // 4. Delete property
		        pdao.deleteById(id);
		        return true;
		    }
		    return false;
	}

}
