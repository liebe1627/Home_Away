package com.homeaway.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeaway.DTO.BookingDTO;
import com.homeaway.DTO.BookingDisplayDTO;
import com.homeaway.DTO.FacilitiesDTO;
import com.homeaway.DTO.PropertListDTO;
import com.homeaway.DTO.PropertyDTO;
import com.homeaway.DTO.UserDTO;
import com.homeaway.customException.NoBookingFound;
import com.homeaway.customException.NoBookingYetException;
import com.homeaway.customException.NoPropertiesFound;
import com.homeaway.customException.UserNotFound;
import com.homeaway.dao.BookingsDao;
import com.homeaway.dao.PropertyDao;
import com.homeaway.dao.UserDao;
import com.homeaway.pojo.BookingStatus;
import com.homeaway.pojo.Bookings;
import com.homeaway.pojo.Property;
import com.homeaway.pojo.User;
import com.homeaway.pojo.UserType;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class BookingServicesImpl implements BookingServices {

	@Autowired
	UserDao udao;
	@Autowired
	PropertyDao pdao;
	@Autowired
	BookingsDao bdao;
	ModelMapper model;

	@Override
	public boolean addBooking(BookingDTO bookingDertails) throws NoPropertiesFound {
		User user = udao.findById(bookingDertails.getUserId())
				.orElseThrow(() -> new UserNotFound("The user with the given id was not found"));
//		User owner=udao.findById(bookingDertails.getOwnerId()).orElseThrow(()->new UserNotFound("The owner with the given id was not found"));
		Property property = pdao.findById(bookingDertails.getPropertyId())
				.orElseThrow(() -> new NoPropertiesFound("The property with the given id was not found"));
		
//		System.out.println("User Found: " + user.getId());
//        System.out.println("Property Found: " + property.getId());

		Bookings booking = new Bookings();
		booking.setUserId(user);
//		booking.setOwnerId(owner);
		booking.setPropertyId(property);
		booking.setDate(bookingDertails.getDate());
		booking.setTime(bookingDertails.getTime());

		Bookings added = bdao.save(booking);
		
		if (added != null) {
//			System.out.println(added);
			
			return true;
		} else {
//			System.out.println(added);
			return false;
		}
	}

	@Override
	public List<BookingDisplayDTO> getAllBookings() {
		List<Bookings> bookings=bdao.findAll();
		if(bookings.isEmpty()) {
			throw new NoBookingYetException("There are no bookings avaliable");
		}
		List<BookingDisplayDTO> bookingsDTO= new ArrayList<>();
		for(Bookings b:bookings) {
			BookingDisplayDTO bdto = new BookingDisplayDTO();
			bdto.setId(b.getId());
			bdto.setDate(b.getDate());
			bdto.setTime(b.getTime());
			bdto.setStatus(b.getStatus());
			
			Property p = b.getPropertyId();
			PropertListDTO prop = new PropertListDTO();
			prop.setAdd1(p.getAdd1());
			prop.setAdd2(p.getAdd2());
			prop.setCity(p.getCity());
			prop.setState(p.getState());
			prop.setName(p.getName());
			prop.setId(p.getId());
			prop.setOwner(p.getOwner().getId());
			p.setRent(p.getRent());
			List<FacilitiesDTO> facilities = p.getFacilities().stream().map(facility->new FacilitiesDTO(facility.getId(),facility.getName())).collect(Collectors.toList());
			prop.setFacilities(facilities);
			bdto.setProperties(prop);
			
			List<UserDTO> bookedUsers = bookings.stream()
				    .filter(book -> book.getPropertyId().getId().equals(p.getId()))
				    .map(book -> {
				        User u = book.getUserId();
				        UserDTO udto = new UserDTO();
				        udto.setId(u.getId());
				        udto.setName(u.getName());
				        udto.setUsername(u.getUsername());
				        udto.setNumber(u.getNumber());
				        udto.setEmail(u.getEmail());
				        udto.setUtype(u.getUtype());
				        return udto;
				    })
				    .distinct()
				    .collect(Collectors.toList());
			bdto.setUsers(bookedUsers);
			bookingsDTO.add(bdto);
		}
		return bookingsDTO;
	}

	@Override
	public List<BookingDisplayDTO> getBookingsByUserId(Long userId) {
		User user = udao.findById(userId)
	            .orElseThrow(() -> new UserNotFound("User with given ID not found"));

	    List<Bookings> bookings = bdao.findByUserId(user);
	    if (bookings.isEmpty()) {
	        throw new NoBookingYetException("No bookings available for this user");
	    }

	    List<BookingDisplayDTO> bookingsDTO = new ArrayList<>();
	    for (Bookings b : bookings) {
	        BookingDisplayDTO bdto = new BookingDisplayDTO();
	        bdto.setId(b.getId());
	        bdto.setDate(b.getDate());
	        bdto.setTime(b.getTime());
	        bdto.setStatus(b.getStatus());

	        Property p = b.getPropertyId();
	        PropertListDTO prop = new PropertListDTO();
	        prop.setAdd1(p.getAdd1());
	        prop.setAdd2(p.getAdd2());
	        prop.setCity(p.getCity());
	        prop.setState(p.getState());
	        prop.setName(p.getName());
	        prop.setId(p.getId());
	        prop.setOwner(p.getOwner().getId());
	        prop.setRent(p.getRent());

	        List<FacilitiesDTO> facilities = p.getFacilities().stream()
	                .map(facility -> new FacilitiesDTO(facility.getId(), facility.getName()))
	                .collect(Collectors.toList());
	        prop.setFacilities(facilities);
	        bdto.setProperties(prop);

	        // Set the user who made the booking
	        List<UserDTO> bookedUsers = new ArrayList<>();
	        UserDTO udto = new UserDTO();
	        udto.setId(user.getId());
	        udto.setName(user.getName());
	        udto.setUsername(user.getUsername());
	        udto.setNumber(user.getNumber());
	        udto.setEmail(user.getEmail());
	        udto.setUtype(user.getUtype());

	        bookedUsers.add(udto);
	        bdto.setUsers(bookedUsers);
	        bookingsDTO.add(bdto);
	    }

	    return bookingsDTO;
	}

	@Override
	public List<BookingDisplayDTO> getBookingsByOwnerId(Long ownerId) {
		User owner = udao.findById(ownerId)
	            .orElseThrow(() -> new UserNotFound("Owner with given ID not found"));

	    // Find all properties owned by this owner
	    List<Property> properties = pdao.findByOwner(owner);
	    if (properties.isEmpty()) {
	        throw new NoBookingYetException("No properties found for this owner");
	    }

	    List<BookingDisplayDTO> bookingsDTO = new ArrayList<>();

	    for (Property property : properties) {
	        // Find bookings for each property
	        List<Bookings> bookings = bdao.findByPropertyId(property);
	        for (Bookings b : bookings) {
	            BookingDisplayDTO bdto = new BookingDisplayDTO();
	            bdto.setId(b.getId());
	            bdto.setDate(b.getDate());
	            bdto.setTime(b.getTime());
	            bdto.setStatus(b.getStatus());

	            // Set property details
	            PropertListDTO prop = new PropertListDTO();
	            prop.setAdd1(property.getAdd1());
	            prop.setAdd2(property.getAdd2());
	            prop.setCity(property.getCity());
	            prop.setState(property.getState());
	            prop.setName(property.getName());
	            prop.setId(property.getId());
	            prop.setOwner(property.getOwner().getId());
	            prop.setRent(property.getRent());

	            List<FacilitiesDTO> facilities = property.getFacilities().stream()
	                    .map(facility -> new FacilitiesDTO(facility.getId(), facility.getName()))
	                    .collect(Collectors.toList());
	            prop.setFacilities(facilities);
	            bdto.setProperties(prop);

	            // Set user details (who made the booking)
	            List<UserDTO> bookedUsers = new ArrayList<>();
	            UserDTO udto = new UserDTO();
	            User user = b.getUserId(); // Assuming `getUserId()` returns the user who booked
	            udto.setId(user.getId());
	            udto.setName(user.getName());
	            udto.setUsername(user.getUsername());
	            udto.setNumber(user.getNumber());
	            udto.setEmail(user.getEmail());
	            udto.setUtype(user.getUtype());

	            bookedUsers.add(udto);
	            bdto.setUsers(bookedUsers);
	            bookingsDTO.add(bdto);
	        }
	    }
	    return bookingsDTO;
	}

	@Override
	public boolean updateBookingStatus(Long bookingId) {
		Bookings booking = bdao.findById(bookingId).orElseThrow(()-> new NoBookingFound("The booking of id is not avaliable"));
		booking.setStatus(BookingStatus.COMPLETED);
		Bookings b= bdao.save(booking);
		if(b!=null) {
			return true;
		}
		else {
			return false;
		}
	}

}
