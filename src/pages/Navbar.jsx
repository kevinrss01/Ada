import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
export const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div></div>
      <Link to="/">
        <h1>ADA ROBOT</h1>
      </Link>
      <div className="linkContainer">
        <a href="https://www.linkedin.com/in/kevin-rousseau01/">
          <AiFillLinkedin className="linkIcon" />
        </a>
        <a href="https://github.com/kevinrss01">
          <AiFillGithub className="linkIcon" />
        </a>
        <a href="https://twitter.com/Kevinrss10">
          <AiFillTwitterCircle className="linkIcon" />
        </a>
      </div>
    </div>
  );
};
