import React, { useState } from "react";
import { Socket } from "socket.io-client/build/esm/socket";
import { IKeyword, IUser } from "../../pages/home/home";
import KeywordItem from "./keyword-item/keyword-item";
import "./keywords.scss";

interface IProps {
  keywords: IKeyword[];
  socket: Socket;
  user: IUser | null;
}

const Keywords: React.FC<IProps> = ({ keywords, socket, user }) => {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAdd = () => {
    if (newKeyword) {
      socket.emit("addKeyword", {
        keyword: newKeyword,
        user_id: user?.id,
      });
      setNewKeyword("");
    }
  };

  return (
    <div className="keywords">
      <h1>Keywords</h1>
      {keywords.map((keyword) => (
        <KeywordItem
          key={keyword.keyword_id}
          data={keyword}
          user={user}
          socket={socket}
        />
      ))}
      <div className="add-keyword">
        <input
          type="text"
          placeholder="Add a keyword..."
          value={newKeyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewKeyword(e.target.value)
          }
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default Keywords;
