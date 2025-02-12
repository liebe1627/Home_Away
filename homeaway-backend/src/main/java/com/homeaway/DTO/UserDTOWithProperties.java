package com.homeaway.DTO;

import java.util.List;

import com.homeaway.pojo.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDTOWithProperties {
	private long Id;
    private String name;
    private String username;
    private long number;
    private String email;
    private UserType utype;
    private List<PropertyDTO> properties;
}
