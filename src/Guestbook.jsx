import { Link } from "react-router-dom";
import useImageDimensions from "./useImageDims";
import {useEffect, useState} from "react";
import Inventory from "./Inventory";
import './main.css'

import garden from "./assets/garden.png"
import letter from "./assets/letter.png"
import mailDoor from "./assets/mail_door.png"
import mailFlag from "./assets/mail_flag.png"
import star from "./assets/star.png"

const images = [
  {id: "letter", src: letter}, 
  {id: "mailDoor", src: mailDoor},
  {id: "mailFlag", src: mailFlag},
  {id: "star", src: star}
]

export default function Guestbook() {
  const { widths, heights } = useImageDimensions(images);
  const [flagUp, setFlag] = useState(false);
  const [doorOpen, setDoor] = useState(false);
  const [mailPlaced, setMail] = useState(false);
  const [starUp , setStar] = useState(true);
  //TODO get rid of starDone once inventory is implemented
  const [starDone , setStarDone] = useState(false);
  const SF = .042;

  const toggleFlag = () => {
    setFlag(!flagUp);
  }

  const toggleDoor = () => {
    setDoor(!doorOpen);
  }

  const handleMail = () => {
    if (flagUp && mailPlaced) {
      setMail(false);
      setStar(false);
      toggleDoor();
      return;
    }
    if (doorOpen) setMail(true);
    else toggleDoor();
    // TODO: consider fixing and making box clickable to close door
  }

  const handleStar = () => {
    setStar(true);
  }

  return (
    <>
      <h1> Iris's Guestbook</h1>
      <p> garden , leave your name in my corner of the internet !</p>
      <div className="room-container" style={{backgroundImage: `url(${garden})`}}>
        <Link to="/about" className="interactive" title="Back inside"
          style={{
            width: "7%",
            aspectRatio: ".19",
            top: "30%"
          }}></Link>
        <br/>
        <button className="interactive" onClick={toggleFlag} 
          style={{
            width: `${widths["mailFlag"] * SF}%`,
            aspectRatio: `${widths["mailFlag"] / heights["mailFlag"]}`,
            left: "20%",
            top: "44%",
            backgroundImage: `url(${mailFlag})`,
            //TODO: consider having two background images
            transform: `${flagUp? "rotate(-70deg) translate(-15%, -20%)": ""}`,
          }}
        />
        {doorOpen &&<button className="interactive" onClick={toggleDoor} 
          style={{
            width: `${widths["mailDoor"] * SF}%`,
            aspectRatio: `${widths["mailDoor"] / heights["mailDoor"]}`,
            left: "13.5%",
            top: "53.5%",
            backgroundImage: `url(${mailDoor})`,
          }}
        />}
        {<button className="interactive" onClick={handleMail} 
          style={{
            width: "4.5%",
            aspectRatio: ".8",
            left: "15%",
            top: "46%"
          }}
        />}
        {doorOpen && mailPlaced && <button className="interactive"
          style={{
            width: `${widths["letter"] * SF}%`,
            aspectRatio: `${widths["letter"] / heights["letter"]}`,
            left: "17%",
            top: "47%",
            backgroundImage: `url(${letter})`,
          }}
        />}
        {doorOpen && !starUp && <button className="interactive" onClick={handleStar}
          style={{
            width: `${widths["star"] * SF}%`,
            aspectRatio: `${widths["star"] / heights["star"]}`,
            left: "15%",
            top: "47%",
            backgroundImage: `url(${star})`,
          }}
        />}
        <Inventory/>
      </div>
    </>
  )
}