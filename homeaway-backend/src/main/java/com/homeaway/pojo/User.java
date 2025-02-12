package com.homeaway.pojo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "User")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userId", nullable = false)
	private long Id;
	@Column(name = "name", length = 45, nullable = false)
	private String name;
	@Column(name = "username", length = 45, nullable = false)
	private String username;
	@Column(name = "phone", columnDefinition = "BIGINT", nullable = false)
	private long number;
	@Column(name = "password", nullable = false)
	private String password;
	@Column(name="email", nullable = false)
	private String email;
	@Column(name = "user_type", nullable = false)
	private UserType utype;
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Property> properties= new ArrayList<>();
	@OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Bookings> bookingsAsUser= new ArrayList<>();
//	@OneToMany(mappedBy = "ownerId", cascade = CascadeType.ALL)
//	@JsonManagedReference
//	private List<Bookings> bookingsAsOwner= new ArrayList<>();
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Feedback> feedbacks = new ArrayList<>();
	
}
