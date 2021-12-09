import React, {useState} from "react"
import { DialogAuth } from "react-mui-auth-page";
import { getUserLogin } from "../fetcher";
import Alert from '@mui/material/Alert';


const LoginPage = (props) => {
  const {open, setOpen, setAuth} = props;
  // Fetch
  // TODO: test
  const handleSignIn = ({ email, password }) => {
    
    getUserLogin(email, password).then(resp => resp.json()).then(resp => {
      if (resp.results.length !== 0) {
        console.log("correct");
        const {username} = resp.results[0];
        console.log(username);
        setAuth(true);
      } else {
        console.log("wrong");
      }
      handleClose();
    })
  };

  function handleClose() {
    setOpen(false);
  }

  // TODO: need to add
  function handleSignUp({ email, name, password }) {
    // await doSomethingAsyn();
    console.log("handleSignUp")
  };

  // TODO: need to fix 
  const handleForget = ({ email }) => {

    console.log({ email });
  };

  // TODO: need to add it
  const handleSocial = {
    Google: () => {},
    Github: () => {},
  };

  return (
    <DialogAuth
      open={open}
      textFieldVariant="outlined"
      onClose={handleClose}
      handleSignUp={handleSignUp}
      handleForget={handleForget}
      handleSignIn={handleSignIn}
      handleSocial={handleSocial}
      logoName="Hooman Meets Furry"
    />
  );
};

export default LoginPage;