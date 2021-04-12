import React, { useContext } from 'react';

const Reset = () => {
localStorage.removeItem("cartuser")
localStorage.removeItem("token")
};

export default Reset;
