import { Link } from "react-router-dom";
import { formatDate } from "./util";

export default function PostCard({ content, datePosted, username }) {
  return (
    <div>
      <div>
        <Link to={"/profile/" + username}>{username}</Link>
        <span>{formatDate(datePosted)}</span>
      </div>
      {content}
    </div>
  );
}
