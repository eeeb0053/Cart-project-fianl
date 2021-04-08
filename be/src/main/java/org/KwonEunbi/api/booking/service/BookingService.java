package org.KwonEunbi.api.booking.service;

import java.util.List;

import org.KwonEunbi.api.booking.domain.Booking;

public interface BookingService {
	public long update(String bookName, String bookEmail, String bookPnumber, long bookNum);
}
