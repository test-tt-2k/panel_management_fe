import "./new-member.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createMember } from "../../lib/api/member";

const NewMember = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async e => {
    try {
      e.preventDefault();

      const res = await createMember({ name, username, password });
      toast.success(res?.data?.message);
      navigate("/members");
    } catch (error) {
      setName("");
      setUsername("");
      setPassword("");
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới member"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleCreateUser}>
            <div className="formInput">
              <label>Họ tên</label>
              <input
                type="text"
                placeholder={"Nhập họ tên"}
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Username</label>
              <input
                type="text"
                placeholder={"Nhập username"}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="formInput">
              <label>Password</label>
              <input
                type="password"
                placeholder={"Nhập password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Tạo mới Member</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMember;
