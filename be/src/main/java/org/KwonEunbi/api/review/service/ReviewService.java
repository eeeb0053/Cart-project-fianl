package org.KwonEunbi.api.review.service;

import org.KwonEunbi.api.review.domain.Review;

public interface ReviewService {
    String update(Review review);
    String deleteById(long id);
}
