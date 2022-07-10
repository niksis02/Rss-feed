import { format } from "timeago.js";
import { IFeedItem } from "../../../pages/home/home";
import "./feed-item.scss";

interface IProps {
  feedItem: IFeedItem;
}

const FeedItem: React.FC<IProps> = ({
  feedItem: { title, description, link, pubDate },
}) => {
  return (
    <div className="feed-item">
      <a className="feed-item-link" href={link}>
        {title}
      </a>
      <span className="feed-item-date">{format(pubDate)}</span>
      <article className="feed-item-description">{description}</article>
    </div>
  );
};

export default FeedItem;
