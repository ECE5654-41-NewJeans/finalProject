import React from "react";
import Grid from "@material-ui/core/Grid";
import "./style.css";
import { StreamMessage } from "../proto/random_pb";

interface Props {
  message: StreamMessage.AsObject;
  isCurrentUser: boolean;
}

const ChatBubble: React.FC<Props> = ({ message, isCurrentUser }) => {
  const { senderName, message: text } = message;

  return (
    <Grid
      container
      item
      style={{
        width: "100%",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <blockquote
        className="speech-bubble"
        style={{ backgroundColor: isCurrentUser ? "rgb(255,235,51)" : undefined }}
      >
        <p>{text}</p>
        {!isCurrentUser && <cite>{senderName}</cite>}
      </blockquote>
    </Grid>
  );
};

export default ChatBubble;