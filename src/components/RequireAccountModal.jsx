import React from 'react'
import Button from './Button';
import { NavLink, useNavigate } from 'react-router-dom';
import ENUMS from '../config/enums';
import { Icon } from '@iconify/react';

const RequireAccountModal = ({ show, setShow }) => {

  const navigate = useNavigate();

  const showHideClassName = show ? "show" : "hidden";

  return (
    <div className={`l-Require-account-modal l-Require-account-modal--${showHideClassName}`}>
      <div className="c-Require-account-modal">
        <Icon className="c-Require-account-modal__Close" onClick={() => setShow(() => false)} icon="ant-design:close-circle-filled" />
        <div className="c-Require-account-modal__Top">
          <h1>LeLeLand</h1>
          <p>Create an account to access this feature and more.</p>
        </div>
        <div className="c-Require-account-modal__Btns">
          <Button
            text="Sign Up"
            variation={ENUMS.btnVariation.PRIMARY}
            arrow={true}
            handleOnClick={() => navigate("/sign-up")}
          />
          <p>Already a member? <NavLink to="/login">Login</NavLink></p>
        </div>
      </div>
    </div>

  );
};

export default RequireAccountModal