import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import TextLink from 'components/UI/TextLink/TextLink';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridCard from 'components/GridCard/GridCard';
import Moment from 'moment';
import 'moment/locale/ko'

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
  exhbnTitle,
  rating,
  exhbnPrice,
  ratingCount,
  exhbnImage,
  link,
  exhbnNum,
  hallLocation,
  startDate,
  endDate
}) => {
  return (
    <GridCard
      isCarousel={true}
      favorite={
        <Favourite
          onClick={event => {
            console.log(event);
          }}
        />
      }
      title={<TextLink link={`exhbns/${exhbnNum}`} content={exhbnTitle}/>}
      location={`${hallLocation}`}
      date={`${Moment(startDate).lang("ko").format('YYYY-MM-DD (ddd)')} 
              ~ ${Moment(endDate).lang("ko").format('YYYY-MM-DD (ddd)')}`}
      rating={<Rating rating={rating} ratingCount={ratingCount} type="bulk" />}
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
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
      >
          <img
            src={exhbnImage}
            alt={exhbnTitle}
            key={exhbnNum}
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
