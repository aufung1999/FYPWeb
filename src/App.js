import { useEffect, useState } from "react";
import BarChart from "./BarChart";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Provide from "./Provide";

import picture1 from "./Pictures/picture1.png";
import picture2 from "./Pictures/picture2.png";

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

    setResult(null);

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
      const res = await fetch(
        "https://mldocker7.herokuapp.com/predict",
        requestOptions
      );
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
        <div className="col-2 border d-flex flex-column align-items-center justify-content-center">
          {/* <img src={picture1} alt="Logo" className="" />
          <img src={picture2} alt="Logo" className="" /> */}
          <div className="border my-5">
            <h3>What it does</h3>
            <div className="m-2">
              {/* <h3>Import from computer</h3> */}
              <div>
                The project is combined with Machine Learning and Web
                development. It will predict the imported/select audio file to
                predict what sound event it is.
              </div>
            </div>
          </div>

          <div className=" border">
            <h3>Methods</h3>
            <div className="m-3">
              <h4>Import from computer</h4>
              <div>1. Click the "Choose file" to import your 'wav' file</div>
              <div>
                2. Click the "Submit" button and then wait for the result
              </div>
            </div>
            <div className="m-3">
              <h4>Select from the list</h4>
              <div>1. From the list in the Right</div>
              <div>
                2. Click the "select" button and then wait for the result
              </div>
            </div>
          </div>
        </div>

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

          {result && <BarChart data={result} />}
        </div>

        <Provide audio={audio} setAudio={setAudio} setResult={setResult} />
      </div>
    </div>
  );
}

export default App;
