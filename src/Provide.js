import React, { useEffect, useRef, useState } from "react";
import DogBark from "./Test/DogBark.wav";
import AC from "./Test/AC.wav";
import EngineIdling from "./Test/EngineIdling.wav";
import Drilling from "./Test/Drilling.wav";
import Gunshot from "./Test/Gunshot.wav";
import CarHorn from "./Test/CarHorn.wav";
import Siren from "./Test/Siren.wav";
import ChildrenPlaying from "./Test/ChildrenPlaying.wav";
import Cat from "./Test/Cat.wav";

import "./Provide.css";
import "./App.css";

import Seekbar from "./Seekbar";
import Player from "./Player";

const Data_list = [
  { title: "Air Conditioner", filename: "AC", file: AC },
  {
    title: "Children Playing",
    filename: "ChildrenPlaying",
    file: ChildrenPlaying,
  },
  { title: "Dog Bark", filename: "DogBark", file: DogBark },
  { title: "Drilling", filename: "Drilling", file: Drilling },
  { title: "Engine Idling", filename: "EngineIdling", file: EngineIdling },
  { title: "Gunshot", filename: "Gunshot", file: Gunshot },
  { title: "Car Horn", filename: "CarHorn", file: CarHorn },
  { title: "Siren", filename: "Siren", file: Siren },
  // { title: "Cat",  filename:"Cat", file: Cat },
];

function Provide({ setResult, isWaiting }) {
  // const [choice, setChoice] = useState({});

  const [playing, setPlaying] = useState(null);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0); // forces player to update its time
  const [appTime, setAppTime] = useState(0); // dictated by player, broadcasted to other components

  const requestChoice = async (event, choice) => {
    event.preventDefault();
    isWaiting(true);
    setResult(null);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: choice }),
      };
      const res = await fetch(
        "https://mldocker7.herokuapp.com/choose_predict",
        requestOptions
      );
      const json = await res.json();
      setResult(JSON.parse("[" + json + "]"));
      console.log("*******RESULT************: " + JSON.parse("[" + json + "]"));
      isWaiting(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="col-2">
      {Data_list?.map((each, index) => (
        <div className=" mb-3 border border-3" id="howto2" key={index}>
          <div className="text-center mb-4">
            <div id="howto2_match">{each.title}</div>
          </div>
          <div className="row d-flex">
            <div className="d-flex justify-content-center">
              <button
                className="playBtn mx-2"
                onClick={() => setPlaying(index)}
              >
                PLAY
              </button>
              <button
                className=" stopBtn mx-2"
                onClick={() => setPlaying(null)}
              >
                PAUSE
              </button>
            </div>

            <div>
              {playing === index && (
                <Seekbar
                  value={appTime}
                  min="0"
                  max={duration}
                  onInput={(event) => setSeekTime(event.target.value)}
                />
              )}
            </div>
            <Player
              playing={playing}
              seekTime={seekTime}
              onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
              onLoadedData={(event) => setDuration(event.target.duration)}
              srcData={each.file}
              index={index}
            />
          </div>
          <div className="btnPos border-1 my-2 p-1">
            <button
              className="button-33 buttonsize"
              onClick={(e) => requestChoice(e, each.filename)}
            >
              select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Provide;
