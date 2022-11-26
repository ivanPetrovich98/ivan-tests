import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/singleNewsItem">
            <h2>singleNewsItem</h2>
          </Link>
        </li>
        <li>
          <Link to="/singleTechItem">
            <h2>singleTechItem</h2>
          </Link>
        </li>
        <li>
          <Link to="/uploadFile">
            <h2>Upload File</h2>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
