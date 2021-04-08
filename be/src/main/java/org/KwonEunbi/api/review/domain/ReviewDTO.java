package org.KwonEunbi.api.review.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

import java.util.Date;

@Component @Data @Lazy
public class ReviewDTO {
	private long reviewNum;
	private long exhbnNum;
	private long userNum;
	private String reviewTitle;
	private String reviewContent;
	private Date regDate;
	private String score;
}
/*
create table boards(
   board_num long primary key auto_increment,
   title varchar(30),
   content varchar(300),
   date varchar(20),
   id varchar(20)
   );*/