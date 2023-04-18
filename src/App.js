import { useEffect, useState } from "react";
import BarChart from "./BarChart";

import { Backdrop, CircularProgress, makeStyles } from "@mui/material";

import { Steps, Hints } from "intro.js-react";
// import "intro.js/introjs.css";

import Provide from "./Provide";
import "./App.css";
import Modal from "./Modal/Modal";
import Animation from "./Animation";

// Chart.register(CategoryScale);

function App() {
  // ======================================
  const [enabled, setEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);

  const onExit = () => {
    setEnabled(false);
  };
  const steps = [
    {
      element: "#use",
      intro: "Explanation",
      position: "right",
    },
    {
      element: "#howto1",
      intro: "Method 1",
      position: "right",
    },
    {
      element: "#howto2",
      intro: "Method 2",
      position: "center",
    },
  ];
  // ======================================

  const [audio, setAudio] = useState(null);
  const [result, setResult] = useState(null);

  const [waiting, isWaiting] = useState(false);

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
    isWaiting(true);
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
      isWaiting(false);
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
    <div className="center">
      <div className="container-fluid ">
        <div className="row ">
          {(result === null || result === false) && <Animation />}
          <div className="d-flex justify-content-center">
            <Steps
              enabled={enabled}
              steps={steps}
              initialStep={initialStep}
              onExit={onExit}
            />
          </div>
          <div className="col-2 d-flex flex-column justify-content-center ">
            <div className="border my-2 shadow " id="use">
              <h3 className="m-2 d-inline-flex border-bottom border-5 ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i>Use</i>
              </h3>
              <div className="m-2">
                {/* <h3>Import from computer</h3> */}
                <div className="shadow-sm p-2 ">
                  The project is combined with Machine Learning and Web
                  development. It will predict the imported/select audio file to
                  predict what sound event it is.
                </div>
              </div>
            </div>

            <div className=" border my-2 p-1 shadow " id="howto">
              <h3 className="m-2 d-inline-flex border-bottom border-5 ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Methods</i>
              </h3>

              <div className="m-3">
                <h4>Import from computer</h4>
                <div className="d-flex">
                  <div>1.&nbsp;&nbsp;</div>
                  <div>Click the "Choose file" to import your 'wav' file</div>
                </div>
                <div className="d-flex">
                  <div>2.&nbsp;&nbsp;</div>
                  <div>
                    Click the "Submit" button and then wait for the result
                  </div>
                </div>
              </div>
              <div className="m-3 mt-4">
                <h4>Select from the list</h4>
                <div className="d-flex">
                  <div>1.&nbsp;&nbsp;</div>
                  <div>From the list in the Right</div>
                </div>
                <div className="d-flex">
                  <div>2.&nbsp;&nbsp;</div>
                  <div>
                    Click the "select" button and then wait for the result
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-8 min-vh-100 border bg-info-">
            <div
              className="row "
              style={{
                // position: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "5vh" /* Magic here */,
              }}
            >
              <form className="col  text-center" onSubmit={handleSubmit} >
                <div className="d-inline-block border m-3 p-2" id="howto1">
                  <label className="custom-file-upload me-3">
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => addFile(e)}
                      accept="audio/wav"
                    />
                    {/* <span className="btn border shadow-sm" >Upload File</span> */}
                  </label>
                  <input
                    type="submit"
                    className="btn border shadow-sm"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
            <div className="row row-cols-2 row-cols-lg-5 mt-5">
              {result?.map((each, index) => (
                <div className=" col-2 ">
                  <div className="row p-2" key={index}>
                    <div
                      className={`border shadow-sm rounded p-2 d-flex justify-content-center
                       ${
                         each > 0.5
                           ? "predMostRes"
                           : each > 0.01
                           ? "predLessRes"
                           : null
                       }`}
                    >
                      <div className="col-auto text-end me-2">
                        {classes[index]}:
                      </div>
                      <div className="col-4 ">{each.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {waiting === true && (
              <Backdrop open>
                <CircularProgress color="inherit" />
              </Backdrop>
            )}

            {result && <BarChart data={result} />}
          </div>

          <Provide
            audio={audio}
            setAudio={setAudio}
            setResult={setResult}
            isWaiting={isWaiting}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
