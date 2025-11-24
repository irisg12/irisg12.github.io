import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import useImageDimensions from "./useImageDims";
import { useInventory } from "./InventoryContext";
import Inventory from "./Inventory";
import './main.css';

import sideRoom from "./assets/room_side.png";
import curtains from "./assets/curtains.png";
import curtainsUp from "./assets/curtains_up.png";
import rug from "./assets/rug.png";
import rugUp from "./assets/rug_up.png";
import seeds from "./assets/seeds.png";
import waterCan from "./assets/water_can.png";

const images = [
  {id: "curtains", src: curtains},
  {id: "curtainsUp", src: curtainsUp},
  {id: "rug", src: rug},
  {id: "rugUp", src: rugUp},
  {id: "seeds", src: seeds},
  {id: "waterCan", src: waterCan}
]

/* ~~~ notes ~~~
- it needs to feel more integrated with the website and also more cozy
- paper crumple effect pop ups 
- background animations? 
- pencil texture lines 
*/

export default function About() {
  const [curtainsOpen, setCurtains] = useState(false);
  const [rugFlipped, setRug] = useState(false);
  const [seedsUp, setSeeds] = useState(false);
  const [planted, setPlanted] = useState(false);
  const [grown, setGrown] = useState(false);
  const SF = .042;

  const { widths, heights } = useImageDimensions(images);
  const { addItem, removeItem, setActiveItem, checkMatch } = useInventory();

  const toggleCurtains = () => {
    setCurtains(!curtainsOpen);
  }

  const toggleRug = () => {
    setRug(!rugFlipped);
  }

  const handleSeeds = () => {
    setSeeds(true);
    addItem(seeds);
  }

  const handlePlant = () => {
    if (checkMatch(seeds)) {
      setPlanted(true);
      removeItem(seeds);
      setActiveItem(-1);
    }
    if (checkMatch(waterCan) && planted) {
      setGrown(true);
      removeItem(waterCan);
      setActiveItem(-1);
    }
  }

  return (
    <>
      <h1> About Me</h1>
      <p> window</p>
      <div className="room-container" style={{backgroundImage: `url(${sideRoom})`}}>
        <Link to="/projects" className="nav-button">&lt;</Link>
        <br />
        <Link to="/guest-garden" className="interactive" title="Guestbook (garden)"
          style={{
            width: "17%",
            aspectRatio: ".5",
            left: "62%",
            top: "18%"
          }}></Link>
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
        {curtainsOpen && <button className="interactive" onClick={handlePlant} 
        style={{
          width: `${grown ? widths["rugUp"] * SF * .3 : widths["rug"] * SF * .3}%`,
          aspectRatio: `${grown ? widths["rugUp"] / heights["rugUp"] : widths["rug"] / heights["rug"]}`,
          left: "22%",
          top: `${grown ? 43:43}%`,
          backgroundImage: `url(${grown? rugUp: rug})`
        }}>
        </button>}
        <Inventory/>
      </div>
    </>
  )
}

/* window/side (art & about) - window, garden door, music player, keyboard garden entrance 
study (projs)- desk, lamp, 3d printer? tool workspace, door?
kitchen (personal) - fridge (magnets), drawers, 
living room (pics) - pic collage wall, chair, plant
*/