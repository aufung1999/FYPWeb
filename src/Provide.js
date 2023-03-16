import React, { useEffect, useState } from "react";
import DogBark from "./Test/DogBark.wav";
import AC from "./Test/AC.wav";
// import {RNFetchBlob} from "rn-fetch-blob"

function Provide({ audio, setAudio, setResult }) {
  const [file, setFile] = useState({});

  // setFile({
  //     uri: DogBark,
  //     name: "DogBark",
  //     type: 'image/png', // if you can get image type from cropping replace here
  //   });


  useEffect(() => {
    const foo = async () => {
      try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "React Hooks POST Request Example" }),
          };
        const res = await fetch("http://127.0.0.1:8000/choose_predict",requestOptions);
        const json = await res.json();
        setResult(JSON.parse("[" + json + "]"));
        console.log(
          "*******RESULT************: " + JSON.parse("[" + json + "]")
        );
      } catch (error) {
        alert(error);
      }
    };

    foo();
  }, []);

  const playAudio = (e, data) => {
    e.preventDefault();
    let audio = new Audio(data);
    audio.play();
    setAudio(audio);
  };

  return (
    <div className="col">
      <div>
        <button onClick={(e) => playAudio(e, DogBark)}>play</button>
      </div>
    </div>
  );
}

export default Provide;
