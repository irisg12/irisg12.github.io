import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useImageDimensions from "./useImageDims";
import './main.css'

import livingRoom from "./assets/room_living.png"
import plant from "./assets/plant.png"
import thread from "./assets/thread.png"

const images = [
  {id: "plant", src: plant}, 
  {id: "thread", src: thread}
]

export default function PicGarden() {
  const [plantUp, setPlant] = useState(false);
  const [threadUp, setThread] = useState(false);
  const { widths, heights } = useImageDimensions(images);
  const SF = .042;

  const togglePlant = () => {
    setPlant(!plantUp);
  }

  const handleThread = () => {
    if (!threadUp) setThread(!threadUp);
  }

  return (
    <>
      <h1> pics</h1>
        <p> pics that mean something to me (living room)  </p>
        <div className="room-container" style={{backgroundImage: `url(${livingRoom})`}}>
            <Link to="/about" className="nav-button">&lt;</Link>
            <br />
            <Link to="/projects-fun" className="nav-button">&gt;</Link>
            <button className="interactive" onClick={togglePlant} 
              style={{
                width: `${widths["plant"] * SF}%`,
                aspectRatio: `${widths["plant"] / heights["plant"]}`,
                left: "8%",
                top: "25%",
                backgroundImage: `url(${plant})`,
                transform: `${plantUp? "rotate(-10deg) translate(-10%, -14%)": ""}`,
                transition: "transform .4s",
                transitionTimingFunction: "ease"
              }}>
            </button>
            {!threadUp && <button className="interactive" onClick={handleThread} 
              style={{
                width: `${widths["thread"] * SF}%`,
                aspectRatio: `${widths["thread"] / heights["thread"]}`,
                left: "15%",
                top: "77%",
                backgroundImage: `url(${thread})`
              }}>
            </button>}
        </div>
    </>
  )
}