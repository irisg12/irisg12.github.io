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

/* window/side (art & about) - window, garden door, music player, keyboard garden entrance 
study (projs)- desk, lamp, 3d printer? tool workspace, door?
kitchen (personal) - fridge (magnets), drawers, 
living room (pics) - pic collage wall, chair, plant
*/