import { DialogAuth } from "react-mui-auth-page";
import { getUserLogin } from "../fetcher";


const LoginPage = (props) => {
  const {open, setOpen, setAuth, setUsername} = props;
  // Fetch
  // TODO: test
  // TODO: Add an alert or friendly reminder
  const handleSignIn = ({ email, password }) => {
    
    getUserLogin(email, password).then(resp => resp.json()).then(resp => {
      if (resp.results.length !== 0) {
        console.log("corret email");
        const {username} = resp.results[0];
        setAuth(true);
        setUsername(username);
        
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