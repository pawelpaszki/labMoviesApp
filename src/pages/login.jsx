import { useState } from "react";
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  let password = "";
  let email = "";
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (email === "" || password === "") {
        setErrorMsg("Please fill in the fields");
        return;
      }
      const {
        data: { user, session },
        error
      } = await login(email, password);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };

  const setEmail = (e) => {
    email = e;
    console.log(email);
  }

  const setPassword = (p) => {
    password = p;
    console.log(password);
  }

  return (
    <>
      {/* <Card> */}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup id="email" style={{ width: "40ch" }}>
            <FormControl>
              <InputLabel>Email address</InputLabel>
              <Input id="email" onInput={e => setEmail(e.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup id="password" style={{ marginTop: "15px", width: "40ch" }}>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input id="password" onInput={e => setPassword(e.target.value)}/>
            </FormControl>
          </FormGroup>
          {errorMsg && (
            <Alert
              severity="warning"
              onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
          <div>
            <Button disabled={loading} type="submit" className="w-50">
              Login
            </Button>
          </div>
        </form>
        <div>
          New User? 
          <Button>
            <Link to={"/register"}>Register</Link>
          </Button>
        </div>
      {/* </Card> */}
    </>
  );
};

export default Login;