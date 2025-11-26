import { Link } from "react-router-dom";
import useImageDimensions from "./useImageDims";
import { useEffect, useState } from "react";
import Inventory from "./Inventory";
import { useInventory } from "./InventoryContext";
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
  const { addItem, removeItem, checkMatch, puzzleStates, updatePuzzleState } = useInventory();
  const { wheelPlaced, letterUp, starUp, buttonPlaced, threadPlaced } = puzzleStates;
  const [starDone , setStarDone] = useState(false);
  const [skateboardUp, setSkateboard] = useState(false);
  const SF = .042;

  const handleStar = () => {
    if (buttonPlaced && !starDone) updatePuzzleState('starUp', false);
    if (buttonPlaced && !starUp){
      updatePuzzleState('starUp', true);
      setStarDone(true);
      addItem(star);
    }
  }

  const handleLetter = () => {
    updatePuzzleState('letterUp', true);
    addItem(letter);
  }

  const handleWheel = () => {
    if (checkMatch(wheel)) {
      updatePuzzleState('wheelPlaced', true);
      removeItem(wheel);
    }
    if (wheelPlaced) {
      setSkateboard(!skateboardUp);
    }
  }

  const handleThread = () => {
    if (checkMatch(thread)){
      updatePuzzleState('threadPlaced', true);
      removeItem(thread);
    }
  }

  const handleButton = () => {
    updatePuzzleState('buttonPlaced', true);
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
          }}/>
        {!letterUp && <button className="interactive" onClick={handleLetter} 
          style={{
            width: `${widths["letter"] * SF}%`,
            aspectRatio: widths["letter"] / heights["letter"],
            left: "80%",
            top: "75%",
            backgroundImage: `url(${letter})`
          }}/>}
        {!starUp && <button className="interactive" onClick={handleStar} 
          style={{
            width: `${widths["star"] * SF}%`,
            aspectRatio: widths["star"] / heights["star"],
            left: "38%",
            top: "43%",
            backgroundImage: `url(${star})`
          }}/>}
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