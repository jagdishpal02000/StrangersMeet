import "./chat.css";
import queryString from "query-string";
import { useState, useEffect, useReducer } from "react";
import io from "socket.io-client";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  let ENDPOINT = "localhost:4000";
  let socket;
  socket = io(ENDPOINT);
  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {
      console.log("joined");
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);

  return (
    <>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
    </>
  );
};

export default Chat;
