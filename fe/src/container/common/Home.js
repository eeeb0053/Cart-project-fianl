import React, { useContext } from 'react';
import { RecommendExhbn, PopularExhbn, ShowingExhbn, SearchArea, HallGrid } from 'container/index';
import { LayoutContext } from 'context/index';
import { Waypoint } from 'react-waypoint';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({}))

const Home = () => {
  const [, dispatch] = useContext(LayoutContext);
  return (
    <>
    {localStorage.getItem("token") === null ? 
      <>
      <SearchArea />
      <Waypoint
        onEnter={() => dispatch({ type: 'HIDE_TOP_SEARCHBAR' })}
        onLeave={() => dispatch({ type: 'SHOW_TOP_SEARCHBAR' })}
      />
      <HallGrid />
      <ShowingExhbn />
      <PopularExhbn />
      </>
    :
    <><SearchArea />
      <Waypoint
        onEnter={() => dispatch({ type: 'HIDE_TOP_SEARCHBAR' })}
        onLeave={() => dispatch({ type: 'SHOW_TOP_SEARCHBAR' })}
      />
      <HallGrid />
      <RecommendExhbn />
      <PopularExhbn /></>
    }

    </>
  );
};

export default Home;
