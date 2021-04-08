import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'library/hooks/useLocation';
import Sticky from 'react-stickynode';
import { Row, Col } from 'antd';
import { Container, Loader } from 'components/index';
import useWindowSize from 'library/hooks/useWindowSize';
import { Description, Review, Notice, Additional, Reservation,
         BottomReservation, TopBar, Summary } from 'container/index';
import SinglePageWrapper, { ButtonBox } from 'container/exhibition/ExhibitionDetail.style';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios'
import { useHistory } from 'react-router';
import { ADD_EXHBN_PAGE, UPDATE_EXHBN_PAGE } from 'settings/constant';
import { Link } from 'react-router-dom';

const SinglePage = ({ match }) => {
  const { href } = useLocation();
  const [ isModalShowing, setIsModalShowing ] = useState(false);
  const [ props ] = useState([]);
  const { width } = useWindowSize();
  let history = useHistory();
  const [ exhbnDetail, setExhbnDetail ] = useState([]);

  const URL = `http://localhost:8080/exhbns/one/`
  
  useEffect(e => {
    axios.get(URL+match.params.exhbnNum)
    .then(resp => {
      setExhbnDetail(resp.data)
    })
    .catch(err => {
      alert(`전시 상세페이지 실패`)
      throw err;
    })
  }, [])

  sessionStorage.setItem("price", exhbnDetail.exhbnPrice)

  if (isEmpty(exhbnDetail)) return <Loader />;
  
  const deleteExhbn = e => {
    e.preventDefault()
    window.confirm("전시를 삭제하시겠습니까?")
    axios({
      url: 'http://localhost:8080/exhbns',
      method: 'delete',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'Bearer '+localStorage.getItem("token")
      },
      data: { 
        exhbnNum: match.params.exhbnNum 
      }
    })
    .then(resp => {
      alert(`삭제 완료`)
      history.push('/exhbnList')
    })
    .catch(err => {
      alert(`삭제 실패`)
      throw err;
    })
  }
  
  const { rating, ratingCount, author, post } = props;

  return (
    <SinglePageWrapper>
       {/*  { localStorage.getItem("user").admin === '관리자' ? */}
        <ButtonBox>
          <Link to={ADD_EXHBN_PAGE}>
          <button className="btn">등록</button>
          </Link>
          <Link to={`${UPDATE_EXHBN_PAGE}/${exhbnDetail.exhbnNum}`}>
          <button className="btn">수정</button>
          </Link>
          <button className="cancle-btn" onClick={ deleteExhbn }>삭제</button>
        </ButtonBox>
{/*         : <></>
        } */}
      <Container>
        <Row gutter={30}>
          <Col xl={16}>
            <Summary
              title={exhbnDetail.exhbnTitle} 
              number={exhbnDetail.exhbnNum}
              location={exhbnDetail.hallLocation}
              genre={exhbnDetail.exhbnGenre}
              artist={exhbnDetail.exhbnArtist}
              start={exhbnDetail.startDate}
              end={exhbnDetail.endDate}
              price={exhbnDetail.exhbnPrice}
              rating={rating}
              ratingCount={ratingCount}
              shareURL={href} 
              media={exhbnDetail.exhbnImage}
            />
          </Col>
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky
                innerZ={9999}
                activeClass="isSticky"
                top={83}
                bottomBoundary="#reviewSection"
              >
                <Reservation number={exhbnDetail.exhbnNum} price={exhbnDetail.exhbnPrice}/>
              </Sticky>
            ) : (
              <BottomReservation
                title={exhbnDetail.exhbnTitle}
                price={exhbnDetail.exhbnPrice}
                rating={rating}
                ratingCount={ratingCount}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Container>
      <TopBar title={exhbnDetail.exhbnTitle} shareURL={href} author={author} media={exhbnDetail.exhbnImage} />
      
        <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
          <Col xl={16}>
            <Description
              content={exhbnDetail.exhbnContent}
              title={exhbnDetail.exhbnTitle}
              location={exhbnDetail.hallLocation}
              rating={rating}
              ratingCount={ratingCount}
            />
            <Notice />
          </Col>
        </Row>
        <Row gutter={30}>
          <Col xl={16}>
            <Review
              
            />
          </Col>
          <Col xl={8} />
        </Row>
        <Row gutter={30}>
          <Col xl={16}>
            <Additional />
          </Col>
          <Col xl={8} />
        </Row>
      </Container>
    </SinglePageWrapper>
  );
};

export default SinglePage;