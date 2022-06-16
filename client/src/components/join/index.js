import "./join.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className="container text-center mt-5 border rounded p-4">
        <h1 className="text-success">Join The Room</h1>

        <div className="row mt-5">
          <label htmlFor="name" className="col form-label">
            Name :
          </label>
          <input
            type="text"
            className="col form-control"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row mt-5">
          <label htmlFor="room" className="col form-label">
            Room :
          </label>
          <input
            type="text"
            className="col form-control"
            placeholder="Room"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <div className="row mt-4">
            <button className="btn btn-outline-success">Join Room</button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Join;
