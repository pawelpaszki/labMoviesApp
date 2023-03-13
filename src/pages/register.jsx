import { useState } from "react";
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { supabase } from "../supabase/client";

const Register = () => {
  let password = "";
  let passwordConfirm = "";
  let email = "";
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = (email, password) =>
    supabase.auth.signUp({ 
      email, 
      password
     });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password === "" ||
      email === "" ||
      passwordConfirm === ""
    ) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        email,
        password
      );
      if (!error && data) {
        setMsg(
          "Registration Successful. Go to login page to access the app"
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
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

  const setPasswordConfirm = (pc) => {
    passwordConfirm = pc;
    console.log(passwordConfirm);
  }

  return (
    <>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <FormGroup id="email" style={{ width: "40ch" }}>
            <FormControl>
              <InputLabel>Email address</InputLabel>
              <Input id="email" onInput={e => setEmail(e.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup id="password" style={{ marginTop: "15px", width: "40ch" }}>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input id="password" onInput={e => setPassword(e.target.value)} />
            </FormControl>
          </FormGroup>
          <FormGroup id="passwordConfirm" style={{ marginTop: "15px", width: "40ch" }}>
            <FormControl>
              <InputLabel>Confirm Password</InputLabel>
              <Input id="passwordConfirm" onInput={e => setPasswordConfirm(e.target.value)} />
            </FormControl>
          </FormGroup>
          {errorMsg && (
            <Alert
              severity="warning"
              onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
          {msg && (
            <Alert secerity="success" onClose={() => setMsg("")}>
              {msg}
            </Alert>
          )}
          <div>
            <Button disabled={loading} type="submit" className="w-50">
              Register
            </Button>
          </div>
        </form>
      <div>
        Already a User? <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
};

export default Register;