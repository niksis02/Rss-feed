import { useState } from "react";
import { Socket } from "socket.io-client";
import { IKeyword, IUser } from "../../../pages/home/home";
import "./keyword-item.scss";

interface IProps {
  data: IKeyword;
  user: IUser | null;
  socket: Socket;
}

const KeywordItem: React.FC<IProps> = ({ data, user, socket }) => {
  const [input, setInput] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (input.keyword !== data.keyword) {
      socket.emit("editKeyword", { ...input, user_id: user?.id });
    }
  };

  const handleDelete = () => {
    socket.emit("removeKeyword", {
      user_id: user?.id,
      keyword: input.keyword,
      keyword_id: input.keyword_id,
    });
  };

  return (
    <div className="keyword-item">
      <img
        onClick={handleDelete}
        src="https://icons-for-free.com/download-icon-x-1321215629555778185_512.png"
        alt="X"
      />
      <input
        type="text"
        value={input.keyword}
        disabled={!isEditing}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput((elem) => ({ ...elem, keyword: e.target.value }))
        }
      />
      {!isEditing && (
        <button
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          Edit
        </button>
      )}
      {isEditing && <button onClick={handleEdit}>Confirm</button>}
    </div>
  );
};

export default KeywordItem;
