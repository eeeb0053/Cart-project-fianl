  
import React from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import LikeDislike from 'components/UI/CommentCard/LikeDislike';
import Rating from 'components/UI/Rating/Rating';

const CommendCard = (props) => {
  const { authorRating } = props;

  const username = props.singleReview.score;
  const content = props ? props.singleReview.reviewContent : '';
  // const reviewTitle = props ? props.singleReview.reviewTitle : '';
  const commentDate = props ? props.singleReview.regDate : '';
  const postTime = new Date(commentDate).getTime();
  // const authorAvatar = props ? props.reviewAuthorPic.url : '';
  const reviewRating = props ? props.singleReview.score : '';

  return (
    <div className="comment-area">
      <div className="comment-wrapper">
        <div className="comment-header">
            <div className="author-info">
              <h3 className="author-name">{username}</h3>
              {authorRating && (
                <div className="author-rating">{authorRating}</div>
              )}
              <div className="comment-date">
                <Popover
                  placement="bottom"
                  content={moment(commentDate).format(
                    'yyyy-MM-DD'
                  )}
                >
                  <span>{moment(postTime).fromNow()}</span>
                </Popover>
              </div>
            </div>
          <div className="rating-area">
            <LikeDislike />
          </div>
        </div>
        <div className="comment-body">
          <h4>{content}</h4>
        </div>
        <div className="comment-rating">
          
        </div>
      </div>
      <button className="btn">수정</button>
      <button className="cancle-btn">예매취소</button>
    </div>
  );
}

export default CommendCard;