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

import Seekbar from "./Seekbar";
import Player from "./Player";

const Data_list = [
  { title: "Air Conditioner",  filename:"AC", file: AC },
  { title: "Children Playing",  filename:"ChildrenPlaying", file: ChildrenPlaying },
  { title: "Dog Bark", filename:"DogBark", file: DogBark },
  { title: "Drilling",  filename:"Drilling", file: Drilling },
  { title: "Engine Idling",  filename:"EngineIdling", file: EngineIdling },
  // { title: "Gunshot",  filename:"Gunshot", file: Gunshot },
  // { title: "Car Horn",  filename:"CarHorn", file: CarHorn },
  { title: "Siren",  filename:"Siren", file: Siren },
  // { title: "Cat",  filename:"Cat", file: Cat },
];

function Provide({ setResult }) {
  // const [choice, setChoice] = useState({});

  const [playing, setPlaying] = useState(null);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0); // forces player to update its time
  const [appTime, setAppTime] = useState(0); // dictated by player, broadcasted to other components

  const requestChoice = async (event, choice) => {
    event.preventDefault();
    setResult(null)
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: choice }),
      };
      const res = await fetch(
        "http://0.0.0.0:8000/choose_predict",
        requestOptions
      );
      const json = await res.json();
      setResult(JSON.parse("[" + json + "]"));
      console.log("*******RESULT************: " + JSON.parse("[" + json + "]"));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="col" >
      {Data_list?.map((each, index) => (
        <div className=" mb-5" key={index}>
            <div className="text-center">{each.title}</div>
            <div className="row d-flex">
              <button onClick={() => setPlaying(index)}>PLAY</button>
              <button onClick={() => setPlaying(null)}>PAUSE</button>

              {playing == index && (
                <Seekbar
                  value={appTime}
                  min="0"
                  max={duration}
                  onInput={(event) => setSeekTime(event.target.value)}
                />
              )}
              <Player
                playing={playing}
                seekTime={seekTime}
                onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                onLoadedData={(event) => setDuration(event.target.duration)}
                srcData={each.file}
                index={index}
              />
            </div>
            <button className="" onClick={(e) => requestChoice(e, each.filename)}>select</button>
        </div>
      ))}
    </div>
  );
}

export default Provide;
