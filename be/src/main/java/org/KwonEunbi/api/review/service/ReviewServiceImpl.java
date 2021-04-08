package org.KwonEunbi.api.review.service;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.KwonEunbi.api.review.domain.Review;
import org.KwonEunbi.api.review.repository.ReviewRepository;
import org.KwonEunbi.api.common.service.AbstractService;

@Service @RequiredArgsConstructor
public class ReviewServiceImpl extends AbstractService<Review> implements ReviewService{
	private final ReviewRepository repo;
	
	@Override public long save(Review r) { return (repo.save(r) != null) ? 1 : 0;}
	@Override public long delete(Review r) { repo.delete(r); return (getOne(r.getReviewNum()) == null) ? 1 : 0;}
	@Override
	public String update(Review review) {
		Review rev = repo.save(review);
		return (rev != null) ? "SUCCESS" : "FAILURE";
	}
	@Override
	public String deleteById(long id) {
		repo.deleteById(id);
		return (id == 0L) ? "SUCCESS" : "FAILURE";
	}
	@Override public long count() { return (long)repo.count();}
	@Override public List<Review> findAll() { return repo.findAll();}
	@Override public Review getOne(long id) { return repo.getOne(id);}
	@Override public Optional<Review> findById(long id){ return repo.findById(id);}
	@Override public boolean existsById(long id) { return repo.existsById(id);}
}
