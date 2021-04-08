import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Table } from 'antd';
import Wrapper, { FormWrapper, Title2 } from 'container/booking/Booking.style';
import { BOOKING_DETAIL_PAGE } from 'settings/constant';
import { TextLink } from 'components/index';
import Moment from 'moment';
import 'moment/locale/ko'

const BookingList = () => {

  const [bookingList, setBookingList] = useState([])

  const URL = 'http://localhost:8080/bookings'
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return Promise.reject("No access token set.");
    }
    axios.get(URL, { headers: { 'Authorization' : 'Bearer '+localStorage.getItem("token")}
    })
    .then(resp => {
      setBookingList(resp.data)
    })
    .catch(err => {
      alert(`실패`)
      throw err;
    })
  }, [])

  const columns = [
    {
      title: '예약번호',
      dataIndex: 'bookNum',
      key: 'bookNum',
      render: text => <TextLink link={`${BOOKING_DETAIL_PAGE}/${text}`} content={text}/>
    },
    {
      title: '전시명',
      dataIndex: 'exhbnNum',
      key: 'exhbnNum',
    },
    {
      title: '예약자명',
      dataIndex: 'bookName',
      key: 'bookName',
    },
    {
      title: '예약일자',
      dataIndex: 'bookDate',
      key: 'bookDate',
      render: Date => Moment(Date).lang("ko").format('YYYY-MM-DD (ddd)')
    },
    {
      title: '합계',
      dataIndex: 'totalPrice',
      key: 'totalPrice'
    },
    {
      title: '매수',
      dataIndex: 'bookTickets',
      key: 'bookTickets'
    },
  ];
  
  return (
      <Wrapper>
      <Divider />
      <Title2>예매 목록</Title2>
      <Table dataSource={bookingList} 
             columns={columns} />
      <Divider> C:ART  |  Seoul Museum of Art </Divider>
    </Wrapper>
    

  );
};

export default BookingList;
