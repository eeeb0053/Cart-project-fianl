package org.KwonEunbi.api.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.KwonEunbi.api.booking.domain.Booking;

interface BookingCustomRepository{
}
public interface BookingRepository extends JpaRepository<Booking, Long>, BookingCustomRepository{
	@Query(value="update bookings b set b.book_name = :bookName, b.book_email = :bookEmail, b.book_pnumber =:bookPnumber"
			+ " where b.book_num = :bookNum;", nativeQuery = true)
	public long update(@Param("bookName") String bookName,
						@Param("bookEmail") String bookEmail, @Param("bookPnumber") String bookPnumber,
						@Param("bookNum") long bookNum);
}
