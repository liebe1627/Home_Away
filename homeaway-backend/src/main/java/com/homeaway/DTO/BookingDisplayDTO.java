package com.homeaway.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.homeaway.pojo.BookingStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BookingDisplayDTO {
	public Long id;
	public List<UserDTO> users;
//	public UserDTO owners;
	public PropertListDTO properties;
	public LocalTime time;
	public LocalDate date;
	public BookingStatus status;
}
