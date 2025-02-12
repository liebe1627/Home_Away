package com.homeaway.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeaway.DTO.FeedbackDTO;
import com.homeaway.customException.UserNotFound;
import com.homeaway.dao.FeedbackDao;
import com.homeaway.dao.UserDao;
import com.homeaway.pojo.Feedback;
import com.homeaway.pojo.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackServicesImpl implements FeedbackServices {
	
	@Autowired
	FeedbackDao fdao;
	@Autowired
	UserDao udao;
	@Autowired	
	ModelMapper model;

	@Override
	public boolean addFeedback(FeedbackDTO feedbackDTO) {
		User u = udao.findById(feedbackDTO.getUserId())
                .orElseThrow(() -> new UserNotFound("The user was not found"));

   Feedback feed = new Feedback();
   feed.setFeedback(feedbackDTO.getFeedback());
   feed.setUser(u);

   Feedback feedback = fdao.save(feed);
   return feedback != null;
	}

	@Override
	public List<Feedback> getAllFeedback() {
		return fdao.findAll();
	}

}
