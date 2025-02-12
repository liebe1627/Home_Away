package com.homeaway.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeaway.pojo.Feedback;

public interface FeedbackDao extends JpaRepository<Feedback,Long> {
	
}
