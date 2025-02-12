package com.homeaway.DTO;

import com.homeaway.pojo.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDTO {
	private long Id;
	private String name;
	private String username;
	private long number;
	private String email;
	private UserType utype;
}
