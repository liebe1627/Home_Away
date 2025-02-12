package com.homeaway.pojo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Property")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"facilities", "bookings", "owner"})
public class Property {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	@Column(name = "name", nullable = false)
	private String name;
	@Column(name = "city", nullable = false)
	private String city;
	@Column(name = "state", nullable = false)
	private String state;
	@Column(name = "address1", nullable = false)
	private String add1;
	@Column(name = "address2", nullable = false)
	private String add2;
	@Column(name = "rent", nullable = false)
	private int rent;
	@ManyToOne
	@JoinColumn(name = "ownerId", nullable = false)
	@JsonBackReference 
	private User owner;
	@ManyToMany
	@JoinTable(
			name = "property_facilities",
			joinColumns = @JoinColumn(name="property_id"),
			inverseJoinColumns = @JoinColumn(name="facility_id")
			)
	@JsonManagedReference
	private List<Facilities> facilities =new ArrayList<>();
	@OneToMany(mappedBy = "propertyId", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<Bookings> bookings=new ArrayList<>();
}
