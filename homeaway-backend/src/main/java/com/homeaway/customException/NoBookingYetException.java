package com.homeaway.customException;

public class NoBookingYetException extends RuntimeException {
	public NoBookingYetException(String msg) {
		super(msg);
	}
}
