import Login from "./pages/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Members from "./pages/members/Members";
import NewMember from "./pages/new-members/NewMember";
import Datas from "./pages/datas/Datas";
import NewData from "./pages/new-data/NewData";
import UpdateData from "./pages/update-data/UpdateData";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const currentMember = JSON.parse(localStorage.getItem("member"));
    if (!currentMember) {
      navigate("/login");
    } else {
      setMember(currentMember);
    }
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/">
          <Route index element={<Datas />} />
          <Route path="login" element={<Login />} />

          {member?.isAdmin && (
            <Route path="members">
              <Route index element={<Members />} />
              <Route path="new" element={<NewMember />} />
            </Route>
          )}

          <Route path="datas">
            <Route index element={<Datas />} />
            <Route path=":id" element={<UpdateData />} />
            <Route path="new" element={<NewData />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
