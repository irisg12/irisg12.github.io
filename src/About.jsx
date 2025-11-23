import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import useImageDimensions from "./useImageDims";
import './main.css';

import sideRoom from "./assets/room_side.png";
import curtains from "./assets/curtains.png";
import curtainsUp from "./assets/curtains_up.png";
import rug from "./assets/rug.png";
import rugUp from "./assets/rug_up.png";
import seeds from "./assets/seeds.png";

const images = [
  {id: "curtains", src: curtains},
  {id: "curtainsUp", src: curtainsUp},
  {id: "rug", src: rug},
  {id: "rugUp", src: rugUp},
  {id: "seeds", src: seeds}
]

export default function About() {
  const [curtainsOpen, setCurtains] = useState(false);
  const [rugFlipped, setRug] = useState(false);
  const [seedsUp, setSeeds] = useState(false);
  const SF = .042;

  const { widths, heights } = useImageDimensions(images);

  const toggleCurtains = () => {
    setCurtains(!curtainsOpen);
  }

  const toggleRug = () => {
    setRug(!rugFlipped);
  }

  const handleSeeds = () => {
    setSeeds(true);
  }

  return (
    <>
      <h1> About Me</h1>
      <p> window</p>
      <div className="room-container" style={{backgroundImage: `url(${sideRoom})`}}>
        <Link to="/projects" className="nav-button">&lt;</Link>
        <br />
        <Link to="/guest-garden" className="nav-button">Guestbook (garden)</Link>
        <br />
        <Link to="/pic-garden" className="nav-button">&gt;</Link>
        <button className="interactive" onClick={toggleCurtains} 
        style={{
          width: `${widths["curtains"] * SF}%`,
          aspectRatio: widths["curtains"] / heights["curtains"],
          left: "19%",
          top: "10%",
          backgroundImage: `url(${curtainsOpen ? curtainsUp : curtains})`
        }}>
        </button>
        <button className="interactive" onClick={toggleRug} 
        style={{
          width: `${rugFlipped ? widths["rugUp"] * SF : widths["rug"] * SF}%`,
          aspectRatio: `${rugFlipped ? widths["rugUp"] / heights["rugUp"] : widths["rug"] / heights["rug"]}`,
          left: "60%",
          top: `${rugFlipped ? 79 : 80}%`,
          backgroundImage: `url(${rugFlipped? rugUp: rug})`
        }}>
        </button>
        {rugFlipped && !seedsUp && <button className="interactive" onClick={handleSeeds} 
        style={{
          width: `${widths["seeds"] * SF}%`,
          aspectRatio: widths["seeds"] / heights["seeds"],
          left: "72%",
          top: "85%",
          backgroundImage: `url(${seeds})`
        }}>
        </button>}
      </div>
    </>
  )
}

/* window/side (art & about) - window, garden door, music player, keyboard garden entrance 
study (projs)- desk, lamp, 3d printer? tool workspace, door?
kitchen (personal) - fridge (magnets), drawers, 
living room (pics) - pic collage wall, chair, plant
*/