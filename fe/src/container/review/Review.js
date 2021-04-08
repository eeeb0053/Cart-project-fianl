import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosStar, IoIosStarOutline, IoIosArrowDown } from 'react-icons/io';
import { Row, Col, Button, Input, Checkbox, Divider, Modal } from 'antd';
import { CommentCard, Heading, Text } from 'components/index';
import { ReviewForm, UpdateReview } from 'container/index';
import ReviewWrapper, {
  HeaderSection,
  RatingStatus,
  FilterElement,
  RatingSearch,
  RatingWrapper,
  TextButton,
  ModalTitle,
} from 'container/review/Review.style';
import { Element } from 'react-scroll';
import axios from 'axios';

const Search = Input.Search;
const CommentBox = ( props ) => {
  const { reviews } = props;

  return reviews && reviews.length !== 0
    ? reviews.map((singleReview, i) => {
        return (
          <Fragment key={i}>
            <Divider />
            <CommentCard singleReview={singleReview} />
            <UpdateReview singleReview={singleReview}/>
          </Fragment>
        );
      })
    : '검색 결과가 없습니다.';
};

const Review = (props) => {
  const [ review, setReview ] = useState([])
  const {
    ratingCount,
    statusHeadingStyle,
    filterHeadingStyle,
    ratingLabelStyle,
    ratingCountStyle,
  } = props;

  const [state, setState] = useState({
    review: false,
    language: false,
  });
  const handleModalOpen = (key) => {
    { localStorage.getItem("token") != null ? 
      setState({ ...state, [key]: true })
    : 
      alert('로그인 후 작성 가능합니다.')
    }
  };
  const handleModalClose = (key) => {
    setState({ ...state, [key]: false });
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  let URL = 'http://localhost:8080/reviews'
  useEffect(e => {
    axios.get(URL, )
    .then((resp) => {
      setReview(resp.data)
    })
    .catch((err) => {
      alert(`실패`)
      throw err;
    })
  }, [])

  return (
    <Element name="reviews" className="reviews">
      <ReviewWrapper>
        <HeaderSection>
          <RatingStatus>
            <Heading
              content={`${ratingCount} 이용평점`}
              {...statusHeadingStyle}
            />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </RatingStatus>
          <RatingSearch>
            <Search
              placeholder="리뷰검색"
              onSearch={(value) => console.log(value)}
            />
            <Button type="primary" onClick={() => handleModalOpen('review')}>
              이용후기 작성
            </Button>
            <Modal
              visible={state.review}
              onCancel={() => handleModalClose('review')}
              footer={null}
              width="100%"
              maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              wrapClassName="review_modal"
            >
              <ModalTitle>리뷰를 작성해주세요</ModalTitle>
              <ReviewForm />
            </Modal>
          </RatingSearch>
        </HeaderSection>
        <Row gutter={20}>
          <Col sm={12} lg={9}>
            <Heading content="점수별 관람객 수" {...filterHeadingStyle} />
            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="5점" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <Text content="172" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="4점" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                  <Text content="92" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="3점" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                  <IoIosStarOutline />
                  <Text content="34" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="2점" as="span" {...ratingLabelStyle} />
                <RatingWrapper>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarOutline />
                  <IoIosStarOutline />
                  <IoIosStarOutline />
                  <Text content="11" as="span" {...ratingCountStyle} />
                </RatingWrapper>
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}
          </Col>
          <Col sm={12} lg={5}>
            <Heading content="연령대" {...filterHeadingStyle} />
            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="전 연령" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="10대이하" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <FilterElement>
              <Checkbox onChange={onChange}>
                <Text content="20대" as="span" {...ratingLabelStyle} />
              </Checkbox>
            </FilterElement>
            {/* End of Filter Element */}

            <TextButton onClick={() => handleModalOpen('language')}>
              더보기 <IoIosArrowDown />
            </TextButton>

            <Modal
              width={320}
              visible={state.language}
              onCancel={() => handleModalClose('language')}
              footer={null}
              maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              wrapClassName="language_modal"
            >
              <Heading content="연령대" {...filterHeadingStyle} />
              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text
                    content="전 연령"
                    as="span"
                    {...ratingLabelStyle}
                  />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="10대 이하" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text
                    content="20대"
                    as="span"
                    {...ratingLabelStyle}
                  />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text
                    content="30대"
                    as="span"
                    {...ratingLabelStyle}
                  />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="40대" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="50대" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="60대" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="70대" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}

              <FilterElement>
                <Checkbox onChange={onChange}>
                  <Text content="80대" as="span" {...ratingLabelStyle} />
                </Checkbox>
              </FilterElement>
              {/* End of Filter Element */}
            </Modal>
            {/* End of Text Button */}
          </Col>
        </Row>
        <CommentBox reviews={review} />
      </ReviewWrapper>
    </Element>
  );
};

Review.propTypes = {
  statusHeadingStyle: PropTypes.object,
  filterHeadingStyle: PropTypes.object,
  ratingLabelStyle: PropTypes.object,
  ratingCountStyle: PropTypes.object,
};

Review.defaultProps = {
  statusHeadingStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    mr: '10px',
  },
  filterHeadingStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '1.2',
    mb: '0.5em',
  },
  ratingLabelStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    flex: '1',
  },
  ratingCountStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    ml: '8px',
  },
};

export default Review;