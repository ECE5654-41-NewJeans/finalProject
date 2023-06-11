import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  TextField,
  Chip,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserList from "./UserList";
import ChatBubble from "./ChatBubble";
import { Status, StreamMessage, User } from "../proto/random_pb";
import { Session } from "../App";

const style: { [key: string]: React.CSSProperties } = {
  container: {
    height: "95vh",
    width: "75vw",
  },
  paper: {
    padding: "30px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "#C8D8E6",
  }
};

interface Props {
  user: Session;
  userList: Array<User.AsObject>;
  messages: Array<StreamMessage.AsObject>;
  onMessageSubmit: (msg: string, onSuccess: () => void) => void;
}

const Chat: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState("");
  const { userList, messages, onMessageSubmit, user } = props;

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("called");
    e.preventDefault();
    if (!msg) return;
    console.log("here ", msg);
    onMessageSubmit(msg, () => setMsg(""));
  };

   useEffect(() => {
    const storedMsg = localStorage.getItem("chatMsg");
    if (storedMsg) {
      setMsg(storedMsg);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMsg", msg);
  }, [msg]);


  return (
    <form onSubmit={handleSendMessage}>
      <Grid container style={style.container} spacing={3}>
        <Grid item xs={3}>
          <Paper style={style.paper}>
            <UserList
              users={userList.map((x) => ({
                ...x,
                isOnline: x.status === Status.ONLINE,
              }))}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={style.paper}>
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgb(186,206,224)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* {name banner} */}
              <div
                style={{
                  height: "8%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                  <Chip
                    color="primary"
                    size="small"
                    style={{ width: "70px", marginLeft: "10px" }}
                    label="online"
                  />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Typography variant="h5">{user.name}</Typography>
                </Grid>
              </div>
              <Divider />
              <div style={{ height: "852px", overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    message={msg}
                    isCurrentUser={msg.id === user.id}
                  />
                ))}
              </div>
              <Divider />
              <div
                style={{ width: "100%", alignItems: "center", padding: "10px" }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default Chat;
