package com.homeaway.customException;

public class UserNotFound extends RuntimeException{
	public UserNotFound(String msg) {
		super(msg);
	}

}
