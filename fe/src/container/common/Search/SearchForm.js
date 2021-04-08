import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from 'antd';
import { LISTING_SEARCH_POST_PAGE } from 'settings/constant';
import {
  FormWrapper,
  ComponentWrapper
} from 'container/common/Search/Search.style';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

const SearchForm = ({ history }) => {
  const [ exhbnTitle, setExhbnTitle ] = useState('')

  return (
    <FormWrapper>
      <ComponentWrapper>
        <FaMapMarkerAlt className="map-marker" />
        <div className="map_autocomplete">
            <Input
              type="text"
              defaultValue=""
              placeholder="검색하기"
              size="large"
              onChange={e => {setExhbnTitle(`${ e.target.value }`)}}
            />
        </div>
      </ComponentWrapper>
      <Link to = {LISTING_SEARCH_POST_PAGE}>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        onClick={() => localStorage.setItem('exhbnTitle', exhbnTitle)}
      >
        전시 검색
      </Button></Link>
    </FormWrapper>
  );
};

export default withRouter(SearchForm);
