package com.homeaway.services;

import java.util.List;

import com.homeaway.DTO.FeedbackDTO;
import com.homeaway.pojo.Feedback;

public interface FeedbackServices {
	public boolean addFeedback(FeedbackDTO f);
	public List<Feedback> getAllFeedback();
}
