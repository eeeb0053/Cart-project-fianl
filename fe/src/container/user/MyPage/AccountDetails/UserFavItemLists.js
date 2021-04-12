import React, { useEffect, useState } from 'react';
import { SectionGrid, PostPlaceholder } from 'components/index';
import useDataApi from 'library/hooks/useDataApi';
import { EXHBN_DETAIL_PAGE } from 'settings/constant';
import axios from 'axios';

const UserFavItemLists = () => {
  const { data, loadMoreData, loading } = useDataApi('http://localhost:8080/exhbns/topList');
  const [ exhbnList, setExhbnList ] = useState([])
  const favourite_post =
    data[0] && data[0].favourite_post ? data[0].favourite_post : [];
  const user = JSON.parse(localStorage.getItem("cartuser"))

  const URL = 'http://localhost:8080/wishlist';
  useEffect(() => {
    axios.get(URL, {headers: {'Authorization' : 'Bearer '+localStorage.getItem("token")}})
    .then(resp => {
      setExhbnList(resp.data)
    })
    .catch(err => {
      alert(err)
    })
  }, [])

  return (
    <SectionGrid
      link={EXHBN_DETAIL_PAGE}
      data={exhbnList}
      loading={loading}
      limit={6}
      totalItem={exhbnList.length}
      columnWidth={[1 / 2, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6]}
      placeholder={<PostPlaceholder />}
      handleLoadMore={loadMoreData}
    />
  );
};

export default UserFavItemLists;
