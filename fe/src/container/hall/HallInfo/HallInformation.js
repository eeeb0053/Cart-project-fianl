import React from 'react';
import PropTypes from 'prop-types';
import HallWrapper, { HallImage, HallBoxOne, 
  HallBoxTwo, HallBtn, ButtonBox } from 'container/hall/HallInfo/HallInformation.style';
import { Heading, Text } from 'components/index';
import { EXHBN_LIST_PAGE, ADD_HALL_PAGE, UPDATE_HALL_PAGE } from 'settings/constant';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const HallInformation = (props) => {
  const {
    time,
    closedday,
    address,
    pnumber,
    title,
    content,
    titleStyle,
    contentStyle,
    media
  }
= props;

  let history = useHistory();

  const deleteHall = e => {
    e.preventDefault()
    window.confirm("전시관을 삭제하시겠습니까?")
    axios({
      url: 'http://localhost:8080/halls',
      method: 'delete',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'Bearer '+localStorage.getItem("token")
      },
      data: { hallNum: props.num }
    })
    .then(resp => {
      alert(`삭제 완료`)
      history.push(ADD_HALL_PAGE)
    })
    .catch(err => {
      alert(`삭제 실패`)
      throw err;
    })
  }

  return (
    <HallWrapper>
      <HallBoxOne>
        <HallImage>
          <img src={media} alt="" />
        </HallImage>
        <div class="hallInfo">
          <Heading as="h2" content={title} {...titleStyle} />
          <Text content={content} {...contentStyle} />
        </div>
      </HallBoxOne> 
      <HallBoxTwo>
        <div class="hallSum">
          <ul>
            <li><strong>관람시간</strong><span>{time}</span></li>
            <li><strong>휴관일</strong>&emsp;<span>{closedday}</span></li>
            <li><strong>주소</strong>&emsp;&emsp;<span>{address}</span></li>
            <li><strong>대표번호</strong><span>{pnumber}</span></li>
          </ul>
        </div>
        <HallBtn>
          <div class="wrap">
            <Link to={`${EXHBN_LIST_PAGE}/${props.hallNum}`}>
              <a href="#" class="button" >전시보기</a>
            </Link>
          </div>
        </HallBtn>
      </HallBoxTwo>
      <ButtonBox>
          <Link to={ADD_HALL_PAGE}>
          <button className="btn">등록</button>
          </Link>
          <Link to={`${UPDATE_HALL_PAGE}/${props.num}`}>
          <button className="btn">수정</button>
          </Link>
          <button className="cancle-btn" onClick={ deleteHall }>삭제</button>
      </ButtonBox>
    </HallWrapper>
  );
};


HallInformation.propTypes = {
    titleStyle: PropTypes.object,
  };
  
  HallInformation.defaultProps = {
    titleStyle: {
        color: '#2C2C2C',
        fontSize: '25px',
        lineHeight: ['1.15', '1.2', '1.36'],
        padding: '0px 0px 20px',
    },
    contentStyle: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#2C2C2C',
      lineHeight: '1.6',
    },
};

export default HallInformation;