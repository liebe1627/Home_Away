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
public class UserRegisterDTO {
	private long Id;
	private String name;
	private String username;
	private String password;
	private long number;
	private String email;
	private UserType utype;
}
