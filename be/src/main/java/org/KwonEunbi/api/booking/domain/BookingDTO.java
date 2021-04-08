package org.KwonEunbi.api.booking.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

import java.util.Date;

@Component @Data @Lazy
public class BookingDTO {
	private long bookNum;
	private long exhbnNum;
	private long userNum;
	private Date bookDate;
	private String totalPrice;
	private String bookName;
	private String bookEmail;
	private String bookPnumber;
	private String bookTickets;
}
