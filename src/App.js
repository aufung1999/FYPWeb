import { useEffect, useState } from "react";

function App() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setAudio(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("file", audio);

    const requestOptions = {
      method: "POST",
      body: body,
    };

    const res = await fetch("http://127.0.0.1:8000/test/", requestOptions);

    return res.ok ? res : console.log("failed to upload");
  };

  const addFile = (e) => {
    let file = e.target.files[0];
    if (e.target.files[0]) {
      setAudio(file);
    }
  };

  return (
    <div>
      <div className="App">
        {console.log("audio: " + audio)}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          // multiple
          name="file"
          className="myform"
          onChange={(e) => addFile(e)}
          accept="audio/wav"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
