import { Link } from "react-router-dom";
import './main.css'

import kitchen from "./assets/room_kitchen.png"
import batter from "./assets/batter.png"
import canOpener from "./assets/can_opener.png"
import drawer from "./assets/drawer.png"
import drawerOpen from "./assets/drawer_open.png"
import sardines from "./assets/sardines.png"
import waterCan from "./assets/water_can.png"

export default function Error() {
  return (
    <>
      <h1> Personal Projects (not engineering)</h1>
        <p> kitchen </p>
        <div className="room-container" style={{backgroundImage: `url(${kitchen})`}}>
            <Link to="/pic-garden" className="nav-button">&lt;</Link>
            <br />
            <Link to="/about" className="nav-button">Leave? doesn't work yet</Link>
            <br />
            <Link to="/projects" className="nav-button">&gt;</Link>
        </div>
    </>
  )
}