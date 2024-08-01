package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Integer>
{

    List<Feedback> findByFeedBackAnganAidAndStatus(Integer id,String status);
}
