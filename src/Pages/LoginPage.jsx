import { DialogAuth } from "react-mui-auth-page";

const LoginPage = () => {
  const handleSignIn = ({ email, password }) => {
    console.log({ email, password });
  };

  function handleClose() {
    console.log("handleClose")
  }
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
      open={true}
      textFieldVariant="outlined"
      // onClose={handleClose}
      handleSignUp={handleSignUp}
      handleForget={handleForget}
      handleSignIn={handleSignIn}
      handleSocial={handleSocial}
    />
  );
};

export default LoginPage;