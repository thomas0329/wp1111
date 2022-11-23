import AppTitle from '../components/Title';
import LogIn from '../components/LogIn';
import useChat from './hooks/useChat';

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus, signedIn } = useChat();
    const handleLogin = (name) => {
    if (!name)
      displayStatus({
        type: "error",
        msg: "Missing user name",
      });
    else{
      setSignedIn(true);
      console.log("signed in set to true");
    }
    console.log(signedIn);
  }
  return ( 
    <>
        <AppTitle />
        <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
  );
}

export default SignIn;
   