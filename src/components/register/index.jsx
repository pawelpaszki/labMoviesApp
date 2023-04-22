import { useState } from "react";
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { signup } from '../../api/tmdb-api';

const RegistrationForm = () => {
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password === "" ||
      email === "" ||
      passwordConfirm === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      setErrorMsg("Please provide all the fields");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMsg("Passwords don't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const account = await signup(
        email,
        password,
        firstName,
        lastName
      );
      if (account?.id !== undefined) {
        setMsg("Signed up successfully. Go to login page");
      } else {
        setErrorMsg("Error occurred when creating account");
      }
    } catch (error) {
      setErrorMsg("Error occurred when creating account");
    }
    setLoading(false);
  };

  const handleSetEmail = (e) => {
    setEmail(e);
  }

  const handleSetPassword = (p) => {
    setPassword(p);
  }

  const handleSetPasswordConfirm = (pc) => {
    setPasswordConfirm(pc);
  }

  const handleSetFirstName = (fn) => {
    setFirstName(fn);
  }

  const handleSetLastName = (ln) => {
    setLastName(ln);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <FormGroup id="email">
              <FormControl>
                <InputLabel>Email address</InputLabel>
                <Input id="email" onInput={e => handleSetEmail(e.target.value)} />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup id="firstName" noValidate style={{ marginTop: "15px", marginBottom: "10px" }}>
              <FormControl>
                <InputLabel>First name</InputLabel>
                <Input id="firstName" onInput={e => handleSetFirstName(e.target.value)} />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup id="lastName" style={{ marginTop: "15px", marginBottom: "10px" }}>
              <FormControl>
                <InputLabel>Last name</InputLabel>
                <Input id="lastName" onInput={e => handleSetLastName(e.target.value)} />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup id="password" style={{ marginTop: "15px", marginBottom: "10px" }}>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input id="password" onInput={e => handleSetPassword(e.target.value)} />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup id="passwordConfirm" style={{ marginTop: "15px", marginBottom: "10px" }}>
              <FormControl>
                <InputLabel>Confirm Password</InputLabel>
                <Input id="passwordConfirm" onInput={e => handleSetPasswordConfirm(e.target.value)} />
              </FormControl>
            </FormGroup>
          </Grid>
          {errorMsg && (
            <Alert
              severity="warning"
              onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
          {msg && (
            <Alert severity="success" onClose={() => setMsg("")}>
              {msg}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Already a user?
              <Button>
                <Link to={"/login"}>Sign in</Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default RegistrationForm;