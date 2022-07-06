import { Link } from "react-router-dom";
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
      <Link className="feed-item-link" to={link}>
        {title}
      </Link>
      <span className="feed-item-date">{format(pubDate)}</span>
      <article className="feed-item-description">{description}</article>
    </div>
  );
};

export default FeedItem;
