import { Paper, TextField, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { login } from "../../lib/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async e => {
    try {
      e.preventDefault();
      const res = await login({
        username,
        password,
      });
      localStorage.setItem("member", JSON.stringify(res?.data?.data));
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      setUsername("");
      setPassword("");
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (username || password) {
      setError("");
    }
  }, [username, password]);

  useEffect(() => {
    const currentMember = JSON.parse(localStorage.getItem("member"));
    if (currentMember) {
      navigate("/");
    }
  }, []);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Paper>
        <Box width={{ xs: "90vw", lg: "25vw" }} p={2}>
          <Typography variant="h6" fontWeight={"bold"} textAlign={"center"}>
            Panel Management
          </Typography>
          {error && (
            <Box mt={2} textAlign={"center"}>
              <Typography color={"red"} variant="subtitle2">
                {error}
              </Typography>
            </Box>
          )}
          <Box mt={4} component={"form"} onSubmit={handleLogin}>
            <TextField
              variant="standard"
              fullWidth
              size="small"
              label="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Box mt={4}>
              <TextField
                variant="standard"
                value={password}
                fullWidth
                size="small"
                label="Password"
                type="password"
                required
                onChange={e => setPassword(e.target.value)}
              />
            </Box>

            <Box mt={4} textAlign={"center"}>
              <Button variant="outlined" type="submit" size="small">
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
