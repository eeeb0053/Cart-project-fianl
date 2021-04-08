import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { FormControl } from 'components/index';
import { FormHeader, Title, FormContent, FormAction } from 'container/exhibition/AddExhibition.style';
import axios from 'axios'
import DatePicker from "react-datepicker"; 
import { EXHBN_DETAIL_PAGE } from 'settings/constant';
import { useHistory } from 'react-router'

const UpdateExhibition = ({ match }) => {
  const history = useHistory()
  const [ exhbnDetail, setExhbnDetail ] = useState([])
  const [ updateExhbnData, setUpdateExhbnData ] = useState({
    exhbnTitle: "", hallLocation: "", startDate: new Date(), endDate: new Date(), exhbnGenre: "",
    exhbnPrice: "", exhbnArtist: "", exhbnContent: "", exhbnImage: ""
  })
  const { exhbnTitle, hallLocation, startDate, endDate, exhbnGenre, 
          exhbnPrice, exhbnArtist, exhbnContent, exhbnImage } = updateExhbnData
  const [ startdate, setStartdate ] = useState(new Date())
  const [ enddate, setEnddate ] = useState(new Date())
  const onChange = useCallback(e => {
    setUpdateExhbnData({...updateExhbnData, [e.target.name]: e.target.value})
  })

  useEffect(e => {
    axios.get("http://localhost:8080/exhbns/one/"+match.params.exhbnNum)
    .then((resp) => {
      setExhbnDetail(resp.data)
    })
    .catch((err) => {
      alert(`실패`)
      throw err;
    })
  }, [])

  const updateExhbn = e => {
    e.preventDefault()
    setUpdateExhbnData({...updateExhbnData, startDate:startdate})
    setUpdateExhbnData({...updateExhbnData, endDate:enddate})
    window.confirm("전시를 수정하시겠습니까?")
    axios({
      url: 'http://localhost:8080/exhbns/'+match.params.exhbnNum,
      method: 'put',
      headers: {
        'Content-Type'  : 'application/json',
        'Authorization' : 'Bearer '+localStorage.getItem("token")
      },
       data: updateExhbnData
    })
    .then(resp => {
      alert(`수정 완료`)
      history.push(`${EXHBN_DETAIL_PAGE}/${match.params.exhbnNum}`)
    })
    .catch(err => {
      alert(`수정 실패`)
      throw err;
    })
  }

  return (
    <form>
      <FormContent>
        <FormHeader>
          <Title>전시회 등록</Title>
        </FormHeader>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="전시 포스터"
              htmlFor="exhbnImage"
            >
            <input id="exhbnImage" name="exhbnImage" value={exhbnImage} type="file" 
                   accept="image/*" onChange = { onChange }/>     
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="제목"
              htmlFor="exhbnTitle"
            >
            <Input name="exhbnTitle" value={exhbnTitle}
                  placeholder={exhbnDetail.exhbnTitle} 
                  onChange = { onChange }/>
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
          <FormControl
              label="장소"
              htmlFor="hallLocation"
            >
            <Input name="hallLocation" value={hallLocation}
                  placeholder={exhbnDetail.hallLocation} 
                  onChange = { onChange }/>  
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="시작 날짜"
              htmlFor="startDate"
              // error={errors.startDate && <span>이 입력란을 작성해주세요!</span>}
            >
            <DatePicker
              name="startDate"
              // value={startDate}
              dateFormat="yyyy-MM-dd"
              selected={startdate}
              onChange={date => setStartdate(date)}
            />
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="종료 날짜"
              htmlFor="endDate"
            >
            <DatePicker
              name="endDate"
              // value={startDate}
              dateFormat="yyyy-MM-dd"
              selected={enddate}
              onChange={date => setEnddate(date)}
              minDate={startdate}
            />
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="가격"
              htmlFor="exhbnPrice"
            >
            <Input id="exhbnPrice" name="exhbnPrice" value={exhbnPrice} 
                  placeholder={exhbnDetail.exhbnPrice} 
                  onChange = { onChange }/>    
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="장르"
              htmlFor="exhbnGenre"
              // error={errors.exhbnGenre && <span>이 입력란을 작성해주세요!</span>}
            >
          <select name="exhbnGenre" value={exhbnGenre} onChange={ onChange }>
            <option value="selection">선택</option>
            <option value="painting">회화</option>
            <option value="media">미디어</option>
            <option value="sculpture">조각</option>
            <option value="craft">공예</option>
            <option value="installation">설치</option>
          </select>  
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="작가"
              htmlFor="exhbnArtist"
            >
            <Input id="exhbnArtist" name="exhbnArtist" value={exhbnArtist}
                  placeholder={exhbnDetail.exhbnArtist} 
                  onChange = { onChange }/>   
            </FormControl>
          </Col>
        </Row>
        <FormControl
          label="전시 소개"
          htmlFor="exhbnContent"
        >
        <Input.TextArea rows={5} id="exhbnContent" name="exhbnContent" value={exhbnContent}
                  placeholder={exhbnDetail.exhbnContent} 
                  onChange = { onChange }/>     
        </FormControl>
      </FormContent>
      <FormAction>
        <div className="inner-wrapper">
          <Button type="submit" htmlType="submit" onClick={ updateExhbn } >
            수정하기
          </Button>
        </div>
      </FormAction>
    </form>
  );
};

export default UpdateExhibition;