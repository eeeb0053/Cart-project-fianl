import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Menu, Button } from 'antd';
import { LOGIN_PAGE, REGISTRATION_PAGE, ADMIN_PAGE } from 'settings/constant';
import { SettingOutlined } from '@ant-design/icons';

const AuthMenu = ({ className }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  const click = e => {
    e.preventDefault()
    history.push(ADMIN_PAGE)
  }
  return (
    <><Menu className={className}>
    { localStorage.getItem("token") != null && JSON.parse(localStorage.getItem("user")).admin != null ? 
       <SettingOutlined style={{ 'margin-right': '15px' }}
                        onClick={click}/> : <></>
    }
    {localStorage.getItem("token") === null ? 
      <><Menu.Item key="0">
        <NavLink to={LOGIN_PAGE}>Sign in</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={REGISTRATION_PAGE}>Sign up</NavLink>
      </Menu.Item></>
    :
      <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE} onClick={logout}>Logout</NavLink>
      </Menu.Item>
    } </Menu>
    </>
  );
};

export default AuthMenu;
