import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
import robotImage from "../assets/robot_icon.png";
export const Navbar = () => {
  return (
    <div className="navbarContainer">
      <Link to="/">
        <h1>ADA ROBOT</h1>
      </Link>
      <div>
        <img src={robotImage} alt="Robot icon" />
      </div>
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
