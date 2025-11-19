import { Link } from "react-router-dom";
import './main.css'

export default function Error() {
  return (
    <>
      <h1> Personal Projects (not engineering)</h1>
        <p> kitchen </p>
        <div className="room-container">
            <Link to="/pic-garden" className="nav-button">&lt;</Link>
            <br />
            <Link to="/about" className="nav-button">Leave? doesn't work yet</Link>
            <br />
            <Link to="/projects" className="nav-button">&gt;</Link>
        </div>
    </>
  )
}