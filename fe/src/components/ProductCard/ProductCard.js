import React, { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import TextLink from 'components/UI/TextLink/TextLink';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridCard from 'components/GridCard/GridCard';
import Moment from 'moment';
import 'moment/locale/ko'
import axios from 'axios';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PostGrid = ({
  exhbn,
  hallName
}) => {
  const [ isWishAdd, setIsWishAdd ] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const [ usernum, setUsernum ] = useState(0);
  const [ addWish ] = useState({
    exhbnNum: exhbn.exhbnNum, userNum: 0
  })
  const URL = 'http://localhost:8080/wishlist'
  const wishAddHandler = () => {
    setIsWishAdd(!isWishAdd)
  }
  const wishHandler = e => {
    setUsernum(user.userNum)
    if (!isWishAdd) {
      axios({
        url: URL,
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+localStorage.getItem("token")},
        data: addWish
      })
      .then(resp => {
        alert(`위시리스트에 추가되었습니다!`)
        setIsWishAdd(true)
      })
      .catch(err => {
        alert(`위시리스트 추가: `+err)
        throw err;
      })
    } else if (isWishAdd) {
      axios({
        url: URL+"/"+user.userNum+"/"+exhbn.exhbnNum,
        method: 'delete',
        headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+localStorage.getItem("token")},
      })
      .then(resp => {
        alert(`위시리스트에서 삭제되었습니다.`)
      })
      .catch(err => {
        alert(`위시리스트 삭제: `+err)
        throw err;
      })
    }
  }

  return (
    <GridCard
      isCarousel={true}
      favorite={ <Favourite
        onClick={ wishHandler }
        exhbnNum = {exhbn.exhbnNum}/> }
      title={<TextLink link={`exhbns/${exhbn.exhbnNum}`} content={exhbn.exhbnTitle}/>}
      location={`${hallName}`}
      date={`${Moment(exhbn.startDate).lang("ko").format('YYYY-MM-DD (ddd)')} 
              ~ ${Moment(exhbn.endDate).lang("ko").format('YYYY-MM-DD (ddd)')}`}
      rating={<Rating rating={exhbn.totalScore} ratingCount={exhbn.totalScore} type="bulk" />}
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        renderDotsOutside={false}
        responsive={responsive}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
      >
          <img
            src={exhbn.exhbnImage}
            alt={exhbn.exhbnTitle}
            key={exhbn.exhbnNum}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
            }}
          />
      </Carousel>
    </GridCard>
  );
};

export default PostGrid;
