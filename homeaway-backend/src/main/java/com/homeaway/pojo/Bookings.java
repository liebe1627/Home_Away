package com.homeaway.pojo;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "booking")


public class Bookings {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User userId;
//	@ManyToOne
//	@JoinColumn(name = "owner_id", nullable = false)
//	private User ownerId;
	@ManyToOne
	@JoinColumn(name = "property_id", nullable = false)
	private Property propertyId;
	@Column(name = "booking_date", nullable = false)
	private LocalDate date;
	@Column(name = "booking_time", nullable = false)
	private LocalTime time;
	@Column(name = "ststus", nullable = false)
	@Enumerated(EnumType.STRING)
	private BookingStatus status=BookingStatus.PENDING;
}
