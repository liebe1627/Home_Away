package com.homeaway.customException;

public class NoBookingFound extends RuntimeException{
	public NoBookingFound(String msg) {
		super(msg);
	}
}
