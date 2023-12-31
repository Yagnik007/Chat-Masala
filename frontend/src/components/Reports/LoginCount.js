import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const LoginCount = () => {
  const [loginTimes, setLoginTimes] = useState();
  const [userLogin, setUserLogin] = useState();
  const handleLoginCount = async () => {
    //http://localhost:5000/api/report/getreports
    try {
      const response = await axios.post(
        "http://localhost:5000/api/report/getreports",
        {
          email: userLogin,
        }
      );
      // console.log(response?.data?.user[0].logintimes, "response");
      setLoginTimes(response?.data?.user[0].logintimes);
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log("userLogin", userLogin);
  return (
    <div>
      <Input
        value={userLogin}
        onChange={(e) => setUserLogin(e.target.value)}
        focusBorderColor="grey"
        placeholder="User-email"
        m={2}
      />
      <Box m={2}>LOGIN COUNT : {loginTimes}</Box>
      <Button onClick={handleLoginCount} m={2} width="100%">
        Submit
      </Button>
      {/* <input value={userLogin} onChange={(e) => setUserLogin(e.target.value)} /> */}
    </div>
  );
};

export default LoginCount;
