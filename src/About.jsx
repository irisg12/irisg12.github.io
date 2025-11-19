import { Link } from "react-router-dom";
import './main.css'

export default function About() {
  return (
    <>
      <h1> About Me</h1>
      <p> window</p>
      <div className="room-container">
        <Link to="/projects" className="nav-button">&lt;</Link>
        <br />
        <Link to="/guest-garden" className="nav-button">Guestbook (garden)</Link>
        <br />
        <Link to="/pic-garden" className="nav-button">&gt;</Link>
      </div>
    </>
  )
}