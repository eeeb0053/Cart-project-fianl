package org.KwonEunbi.api.review.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import org.KwonEunbi.api.review.domain.Review;
import org.KwonEunbi.api.review.domain.ReviewDTO;

@Repository
public class ReviewRepositoryImpl extends QuerydslRepositorySupport implements ReviewCustomRepository{
	//private final JPAQueryFactory qf;
	private final EntityManager em;
	public ReviewRepositoryImpl(EntityManager em) {
		super(Review.class);
		//this.qf = qf;
		this.em = em;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<ReviewDTO> findByUserNum(long userNum) {
		return em.createQuery("select "
				+ "r.review_num reviewNum  "
				+ "r.review_title reviewTitle "
				+ "r.review_content reviewContent "
				+ "r.reg_date regDate "
				+ "r.score score"
				+ "u.user_num userNum "
				+ "u.username username "
				+ "u.email email \n"
				+ "from Review r inner join User u on r.user_num = u.user_num \n"
				+ "where r.user_num like :userNum")
				.setParameter("userNum", userNum)
				.getResultList();
	}
}