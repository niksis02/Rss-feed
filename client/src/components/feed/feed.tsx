import { IFeedItem } from "../../pages/home/home";
import FeedItem from "./feed-item/feed-item";
import "./feed.scss";

interface IProps {
  news: IFeedItem[];
}

const Feed: React.FC<IProps> = ({ news }) => {
  return (
    <div className="feed">
      <h1>News</h1>
      {news.map((feedItem) => (
        <FeedItem feedItem={feedItem} key={feedItem.id} />
      ))}
    </div>
  );
};

export default Feed;
