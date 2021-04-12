import React, { useContext, Fragment } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import {
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoIosAdd,
} from 'react-icons/io';
import { Menu, Popover } from 'antd';
import { Container, Image, Heading, Text, Loader, ProfilePicLoader } from 'components/index';
import { AuthProvider, AuthContext } from 'context/index';
import { UserFavItemLists, ReviewList, UpdateUser, BookingList } from 'container/index';
import useDataApi from 'library/hooks/useDataApi';
import {
  USER_PROFILE_FAVOURITE,
  UPDATE_USER_PAGE,
  REVIEW_LIST_PAGE
} from 'settings/constant';
import AgentDetailsPage, {
  BannerSection,
  UserInfoArea,
  ProfileImage,
  ProfileInformationArea,
  ProfileInformation,
  NavigationArea,
} from 'container/user/MyPage/AccountDetails/UserDetails.style';
import { ButtonBox } from 'container/exhibition/ExhibitionDetail.style';

const ProfileNavigation = (props) => {
  const { match, className } = props;
  const { loggedIn } = useContext(AuthContext);
  return (
    <NavigationArea>
      <Container fluid={true}>
        <Menu className={className}>
          <Menu.Item key="0">
            <NavLink exact to={`${match.url}`}>
              내 예약목록
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to={`${match.url}${USER_PROFILE_FAVOURITE}`}>
              내가 찜한 전시
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to={`${match.url}${REVIEW_LIST_PAGE}`}>
              내가 쓴 리뷰
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to={`${match.url}${UPDATE_USER_PAGE}`}>
              회원정보수정
            </NavLink>
          </Menu.Item>
        </Menu>
      </Container>
    </NavigationArea>
  );
};

const ProfileRoute = (props) => {
  const { match } = props;
  return (
    <Container fluid={true}>
      <Route exact
        path={`${match.path}`}
        component={BookingList}
      />
      <Route
        path={`${match.path}${USER_PROFILE_FAVOURITE}`}
        component={UserFavItemLists}
      />
      <Route
        path={`${match.path}${REVIEW_LIST_PAGE}`}
        component={ReviewList}
      />
      <Route
        path={`${match.path}${UPDATE_USER_PAGE}`}
        component={UpdateUser}
      />
    </Container>
  );
};

const AgentProfileInfo = ({ match }) => {
  const { data, loading } = useDataApi('/data/agent.json');
  if (isEmpty(data) || loading) return <Loader />;
  const {
    last_name,
    first_name,
    content,
    profile_pic,
    cover_pic,
    social_profile,
  } = data[0];

  const user = JSON.parse(localStorage.getItem("cartuser"))
 
  return (
    <Fragment>
      <BannerSection>
        <Image className="absolute" src={cover_pic.url} alt="Profile cover" />
      </BannerSection>
      <UserInfoArea>
        <Container fluid={true}>
          <ProfileImage>
            {profile_pic ? (
              <Image src={profile_pic.url} alt="Profile" />
            ) : (
              <ProfilePicLoader />
            )}
          </ProfileImage>
          <ProfileInformationArea>
            <ProfileInformation>
              <Heading content={`${user.name} 님의 MY PAGE`} />
              <Text content={`${user.name}님! 찜한 전시회를 예약해보세요`} />
            </ProfileInformation>
          </ProfileInformationArea>
        </Container>
      </UserInfoArea>
    </Fragment>
  );
};

const UserDetailsPage = (props) => {
  return (
    <AgentDetailsPage>
      <AuthProvider>
        <AgentProfileInfo />
        <ProfileNavigation {...props} />
        <ProfileRoute {...props} />
      </AuthProvider>
    </AgentDetailsPage>
  );
}


export default UserDetailsPage;