import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [member, setMember] = useState(null);
  useEffect(() => {
    const currentMember = JSON.parse(localStorage.getItem("member"));
    setMember(currentMember);
  }, []);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Panel Management</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          {member?.isAdmin && (
            <>
              <Link to="/members" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Member</span>
                </li>
              </Link>
            </>
          )}

          <Link to="/datas" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Data</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
