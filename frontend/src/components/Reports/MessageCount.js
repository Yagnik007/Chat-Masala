import React, { useState } from "react";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import axios from "axios";

const MessageCount = () => {
  const [messageCount, setMessageCount] = useState();
  const [senderEmail, setSenderEmail] = useState();
  const [receiverEmail, setReceiverEmail] = useState();

  const handleMessageCount = async () => {
    // console.log("hi");
    //http://localhost:5000/api/report/getreports
    try {
      const response = await axios.post(
        "http://localhost:5000/api/report/getreports",
        {
          email: senderEmail,
          sender: senderEmail,
          receiver: receiverEmail,
        }
      );
      console.log(response?.data, "response");
      setMessageCount(response?.data?.report[0]?.count || 0);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Stack spacing={3}>
        <Input
          focusBorderColor="grey"
          placeholder="Sender-email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
        />
        <Input
          focusBorderColor="grey"
          placeholder="Receiver-email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          m={2}
        />
        <Box>MESSAGE COUNT: {messageCount}</Box>
        <Button onClick={handleMessageCount}>Submit</Button>
      </Stack>
    </div>
  );
};

export default MessageCount;
