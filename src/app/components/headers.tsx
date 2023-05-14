import Image from "next/image";
import React from "react";
import { FiEdit } from 'react-icons/fi';
import Logo from "../../assets/logo.svg";
import Profile from "../../assets/freya.jpg";
const Headers = () => {
  return (
    <div className="headers">
      <div className="logo">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="write-and-profile">
        <div className="write">
            <FiEdit /> Write
        </div>
            <Image src={Profile} className="profile" alt="picture" />
      </div>
    </div>
  );
};

export default Headers;
