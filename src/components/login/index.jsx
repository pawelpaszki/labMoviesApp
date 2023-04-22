import { useContext, useState } from "react";
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const LoginForm = () => {
  const context = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const unauthorizedMessage = "Incorrect credentials used or account don't exist";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (email === "" || password === "") {
        setErrorMsg("Please provide all the fields");
        return;
      }
      const {
        data: { user, session },
        error
      } = await login(email, password);
      if (error) {
        setErrorMsg(unauthorizedMessage);
      }
      if (user && session) {
        const result = await context.authenticate(email, password);
        if (result?.token !== undefined) {
          setTimeout(() => navigate("/"), 500);
        } else {
          setErrorMsg(unauthorizedMessage);
        }
      }
    } catch (error) {
      setErrorMsg(unauthorizedMessage);
    }
    setLoading(false);
  };

  const handleSetEmail = (e) => {
    setEmail(e);
  }

  const handlePassword = (p) => {
    setPassword(p);
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
            Sign in
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
            <FormGroup id="password" style={{ marginTop: "15px", marginBottom: "10px" }}>
              <FormControl>
                <InputLabel >Password</InputLabel>
                <Input id="password" onInput={e => handlePassword(e.target.value)} />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              New User?
              <Button>
                <Link to={"/register"}>Sign up</Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;