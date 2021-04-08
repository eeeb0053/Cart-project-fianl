import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Menu, Button } from 'antd';
import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constant';

const AuthMenu = ({ className }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return (
    <>
    {localStorage.getItem("token") === null ? 
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE}>Sign in</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={REGISTRATION_PAGE}>Sign up</NavLink>
      </Menu.Item>
    </Menu>
    :
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE} onClick={logout}>Logout</NavLink>
      </Menu.Item>
    </Menu>
    }
    </>
  );
};

export default AuthMenu;
