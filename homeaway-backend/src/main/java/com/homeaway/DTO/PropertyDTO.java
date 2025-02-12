package com.homeaway.DTO;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PropertyDTO {
	private String name;
	private String city;
	private String state;
	private String add1;
	private String add2;
	private int rent;
	private Long owner;
	private List<String> facilities;
}
