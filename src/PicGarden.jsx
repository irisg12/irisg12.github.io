import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useImageDimensions from "./useImageDims";
import Inventory from "./Inventory";
import { useInventory } from "./InventoryContext";
import './main.css'

import livingRoom from "./assets/room_living.png"
import plant from "./assets/plant.png"
import thread from "./assets/thread.png"
import wheel from "./assets/wheel.png"

const images = [
  {id: "plant", src: plant}, 
  {id: "thread", src: thread},
  {id: "wheel", src: wheel}
]

export default function PicGarden() {
  const [plantUp, setPlant] = useState(false);
  const [photoOpen, setPhoto] = useState(false);
  const { widths, heights } = useImageDimensions(images);
  const { addItem, removeItem, puzzleStates, updatePuzzleState } = useInventory();
  const { threadUp, wheelUp } = puzzleStates;
  const SF = .042;

  const togglePlant = () => {
    setPlant(!plantUp);
  }

  const handleThread = () => {
    updatePuzzleState('threadUp', true);
    addItem(thread);
  }

  const togglePhoto = () => {
    setPhoto(!photoOpen);
  }

  const handleWheel = () => {
    updatePuzzleState('wheelUp', true);
    addItem(wheel);
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
              transition: "transform .25s steps(4)",
              //transitionTimingFunction: "ease"
            }}
          />
          {!threadUp && <button className="interactive" onClick={handleThread} 
            style={{
              width: `${widths["thread"] * SF}%`,
              aspectRatio: `${widths["thread"] / heights["thread"]}`,
              left: "15%",
              top: "77%",
              backgroundImage: `url(${thread})`
            }}
          />}
          <button className="interactive" onClick={togglePhoto}
          style={{
            width: "4%",
            aspectRatio: ".66",
            left: "45%",
            top: "23%",
            outline: "1px solid black",
            perspective: "1px", //TODO: figure out how to make this wrok
            transform: `${photoOpen? "rotateY(70deg) translateX(-85%)" : ""}`
          }}/>
          {photoOpen && !wheelUp && <button className="interactive" onClick={handleWheel} 
            style={{
              width: `${widths["wheel"] * SF * 1.6}%`,
              aspectRatio: widths["wheel"] / heights["wheel"],
              left: "46.5%",
              top: "26%",
              backgroundImage: `url(${wheel})`
            }}>
          </button>}
          <Inventory/>
        </div>
    </>
  )
}