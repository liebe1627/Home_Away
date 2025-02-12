package com.homeaway.services;

import java.util.List;

import com.homeaway.DTO.BookingDTO;
import com.homeaway.DTO.BookingDisplayDTO;
import com.homeaway.customException.NoPropertiesFound;

public interface BookingServices {
	public boolean addBooking(BookingDTO bookingDertails) throws NoPropertiesFound;
	public List<BookingDisplayDTO> getAllBookings();
	public List<BookingDisplayDTO> getBookingsByUserId(Long userId);
	public List<BookingDisplayDTO> getBookingsByOwnerId(Long ownerId);
	public boolean updateBookingStatus(Long bookingId);
}
