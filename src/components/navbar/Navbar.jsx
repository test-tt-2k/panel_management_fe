import "./navbar.scss";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [member, setMember] = useState(null);
  useEffect(() => {
    setMember(JSON.parse(localStorage.getItem("member")));
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className=""></div>
        <div className="items">
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="items">{member?.username}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
