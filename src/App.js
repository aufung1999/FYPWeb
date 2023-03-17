import { useEffect, useState } from "react";
import BarChart from "./BarChart";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Provide from "./Provide";

// Chart.register(CategoryScale);

function App() {
  const [audio, setAudio] = useState(null);
  const [result, setResult] = useState(null);

  const classes = {
    0: "Air Conditioner",
    1: "Car Horn",
    2: "Children Playing",
    3: "Dog Bark",
    4: "Drilling",
    5: "Engine Idling",
    6: "Gunshot",
    7: "Jackhammer",
    8: "Siren",
    9: "Street Music",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResult(null)

    console.log(audio);

    const body = new FormData();
    body.append("file", audio);

    const requestOptions = {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: body,
    };
    try {
      const res = await fetch("http://0.0.0.0:8000/predict", requestOptions);
      const json = await res.json();
      setResult(JSON.parse("[" + json + "]"));
      console.log("*******RESULT************: " + JSON.parse("[" + json + "]"));
    } catch (error) {
      alert(error);
    }
  };

  const addFile = (e) => {
    let file = e.target.files[0];
    if (e.target.files[0]) {
      setAudio(file);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>

        <div className="col-8 min-vh-100 border ">
          <div
            className="row "
            style={{
              // position: "fixed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10vh" /* Magic here */,
            }}
          >
            <form className="col border text-center" onSubmit={handleSubmit}>
              <input
                type="file"
                // multiple
                name="file"
                className=""
                onChange={(e) => addFile(e)}
                accept="audio/wav"
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="row d-flex flex-column align-items-center mt-5">
            {result?.map((each, index) => (
              <div className="col border ">
                <div className="row " key={index}>
                  <div className="d-flex ">
                    <div className="col text-end me-2">{classes[index]}:</div>
                    <div className="col ">{each}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {result && <BarChart data={result}/>}
        </div>

        <Provide audio={audio} setAudio={setAudio} setResult={setResult}/>
      </div>
    </div>
  );
}

export default App;
