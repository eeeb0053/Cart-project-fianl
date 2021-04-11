import React, { useState, useEffect } from 'react';
import { Title } from 'container/booking/Booking.style';
import { Information } from 'container/index';
import { Loader } from 'components/index'
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

const BookingInfo = ( props ) => {

  const [ exhbnDetail, setExhbnDetail ] = useState([])
  const [ props2 ] = useState([])

  const URL = `http://localhost:8080/exhbns/`

  useEffect(() => {
    axios.get(URL+props.exhbnNum)
    .then(reps => {
      setExhbnDetail(reps.data)
    })
    .catch(err => {
      alert(`실패`)
      throw err;
    })
  }, [])

  if (isEmpty(exhbnDetail)) return <Loader />;
  
  const { rating, ratingCount, amenities, author} = props2;

  return (
    <form> 
      <div>
        <Title>예매 정보</Title> <br/>
        <Information
              content={exhbnDetail.exhbn.exhbnContent}
              title={exhbnDetail.exhbn.exhbnTitle}
              number={exhbnDetail.exhbn.exhbnNum}
              location={exhbnDetail.hallName}
              genre={exhbnDetail.exhbn.exhbnGenre}
              artist={exhbnDetail.exhbn.exhbnArtist}
              start={exhbnDetail.exhbn.startDate}
              end={exhbnDetail.exhbn.endDate}
              price={exhbnDetail.exhbn.exhbnPrice}
              image={exhbnDetail.exhbn.exhbnImage}
              rating={exhbnDetail.exhbn.totalScore}
              ratingCount={exhbnDetail.exhbn.totalScore}
            />
      </div>
      <br/>
    </form>
  );
};

export default BookingInfo;
