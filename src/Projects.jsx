import { Link } from "react-router-dom";
import useImageDimensions from "./useImageDims";
import { useEffect, useState } from "react";
import Inventory from "./Inventory";
import './main.css'

import workRoom from './assets/room_work.png'
import letter from "./assets/letter.png"
import thread from "./assets/thread.png"
import wheel from "./assets/wheel.png"
import star from "./assets/star.png"

const images = [
  { id: "letter", src: letter },
  { id: "thread", src: thread },
  { id: "wheel", src: wheel },
  { id: "star", src: star }
];

//TODO: handle invalid aspect ratio calcs before images load
export default function Projects() {
  const { widths, heights } = useImageDimensions(images);
  const [wheelPlaced , setWheel] = useState(false);
  const [letterUp , setLetter] = useState(false);
  const [starUp , setStar] = useState(true);
  const [starDone , setStarDone] = useState(false);
  const [buttonPlaced, setButton] = useState(false);
  const [threadPlaced, setThread] = useState(false);
  const [skateboardUp, setSkateboard] = useState(false);
  const SF = .042;

  const handleStar = () => {
    if (buttonPlaced && !starDone) setStar(false);
    if (buttonPlaced && !starUp){
      setStar(true);
      setStarDone(true);
    }
  }

  const handleLetter = () => {
    setLetter(true);
  }

  const handleWheel = () => {
    setWheel(true);
    if (wheelPlaced) {
      setSkateboard(!skateboardUp);
    }
  }

  const handleThread = () => {
    setThread(true);
  }

  const handleButton = () => {
    setButton(true);
  }

  return (
    <>
      <h1> projects </h1>
      <p>(engineering)</p>
      <div className="room-container" style={{backgroundImage: `url(${workRoom})`}}>
        <Link to="/projects-fun" className="nav-button">&lt;</Link>
        <br />
        <Link to="/about" className="nav-button">&gt;</Link>
        <button className="interactive" onClick={handleButton} 
          style={{
            width: "10%",
            aspectRatio: ".66",
            left: "35.5%",
            top: "31%"
          }}>
        </button>
        {!letterUp && <button className="interactive" onClick={handleLetter} 
          style={{
            width: `${widths["letter"] * SF}%`,
            aspectRatio: widths["letter"] / heights["letter"],
            left: "80%",
            top: "75%",
            backgroundImage: `url(${letter})`
          }}>
        </button>}
        {!starUp && <button className="interactive" onClick={handleStar} 
          style={{
            width: `${widths["star"] * SF}%`,
            aspectRatio: widths["star"] / heights["star"],
            left: "38%",
            top: "43%",
            backgroundImage: `url(${star})`
          }}>
        </button>}
        {/*TODO: replace with skateboard button */}
        {wheelPlaced && <button className="interactive" onClick={handleWheel} 
          style={{
            width: `${widths["wheel"] * SF * 1.6}%`,
            aspectRatio: widths["wheel"] / heights["wheel"],
            left: "78.5%",
            top: "51%",
            backgroundImage: `url(${wheel})`
          }}>
        </button>}
        {buttonPlaced && <button className="interactive" onClick={handleStar} 
          style={{
            width: `${widths["wheel"] * SF *1.3}%`,
            aspectRatio: widths["wheel"] / heights["wheel"],
            left: "37%",
            top: "53%",
            backgroundImage: `url(${wheel})`
          }}>
        </button>}
        {threadPlaced && <button className="interactive" //TODO: turn this into image
            style={{
              width: `${widths["thread"] * SF}%`,
              aspectRatio: `${widths["thread"] / heights["thread"]}`,
              left: "27%",
              top: "32%",
              backgroundImage: `url(${thread})`
            }}>
        </button>}
        {/*sewing machine*/}
        <button className="interactive" onClick={handleThread} 
          style={{
            width: "13%",
            aspectRatio: "1.25",
            left: "17.5%",
            top: "38%"
          }}>
        </button>
        <button className="interactive" onClick={handleWheel} 
          style={{
            width: "6%",
            aspectRatio: ".27",
            left: "79%",
            top: "45%",
            transform: `${wheelPlaced && skateboardUp ? "rotate(10deg) translate(10%, -25%)": ""}`,
            transition: "transform .25s steps(4)",
            transitionTimingFunction: "ease"
          }}>
        </button>
        <Inventory/>
      </div>
    </>
  )
}