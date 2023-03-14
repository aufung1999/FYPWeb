import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSubmit = async (e) => {
      const body = new FormData();
      body.append("file", e.target.file);
      const res = await fetch('http://127.0.0.1:8000/predict', { method: "POST", body });
      return res.ok ? res : console.log('failed to upload: ');

  };

  return (
    <div>
      <div className="App">
        {/* {data?.map((each_data, index) => (
          <div key={index}>{each_data}</div>
        ))} */} 
      {data?.message}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          // multiple
          name="file"
          className="myform"
          // onChange={handleFileChange}
          accept="audio/wav"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
