package com.homeaway.customException;

public class UsernameAlreadyExists extends RuntimeException{
	public UsernameAlreadyExists(String message) {
		super(message);
	}
}
