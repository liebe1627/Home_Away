package com.homeaway.pojo;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Facilities")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Facilities {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "facility_id")
	private Long Id;
	@Column(name = "name", nullable = false)
	private String name;
	@ManyToMany(mappedBy = "facilities")
	@JsonBackReference
	private List<Property> properties = new ArrayList<>();

}
