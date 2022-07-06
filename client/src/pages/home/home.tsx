import { useEffect, useState } from "react";
import Feed from "../../components/feed/feed";
import Keywords from "../../components/keywords/keywords";
import io from "socket.io-client";
import "./home.scss";
import { API } from "../../api/axios";
import { Alert, Snackbar } from "@mui/material";

export interface IFeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface IKeyword {
  keyword_id: string;
  keyword: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
}

const socket = io("http://localhost:5000");

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [feed, setFeed] = useState<IFeedItem[]>([]);
  const [keywords, setKeywords] = useState<IKeyword[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      const { data } = await API.get<{ data: IUser; status: string }>("/me");
      setUser(data.data);
    };
    fetchMe();
  }, []);

  useEffect(() => {
    socket.emit("getFeed", user?.id);

    socket.on("feed", (data: IFeedItem[]) => {
      setFeed(data);
    });

    socket.on("getFeed_addKeyword", (data: IFeedItem[]) => {
      setFeed((feed) => [
        ...data.filter((elem) => {
          return !feed.find((e) => e.id === elem.id);
        }),
        ...feed,
      ]);
    });

    socket.on("getFeed_removeKeyword", (data: IFeedItem[]) => {
      setFeed((feed) =>
        feed.filter((elem) => {
          return !data.find((e) => e.id === elem.id);
        }),
      );
    });

    socket.on("keywords", (data: IKeyword[]) => {
      setKeywords(data);
    });

    socket.on("removeKeyword", (data: string) => {
      setKeywords((keywrds) => keywrds.filter((elem) => elem.keyword_id !== data));
    });

    socket.on("addKeywordEvent", (data: IKeyword) => {
      setKeywords((keyword) =>
        !keyword.find((e) => e.keyword_id === data.keyword_id)
          ? [...keyword, data]
          : keyword,
      );
    });

    socket.on("error", (data: string) => {
      setError(data);
    });
  }, [user]);

  const handleClose = () => {
    setError("");
  };

  return (
    <div className="home">
      <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Feed news={feed} />
      <Keywords keywords={keywords} socket={socket} user={user} />
    </div>
  );
};

export default Home;
