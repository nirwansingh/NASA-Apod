import React from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
		console.log("fetched from catch today")
        return;
      }
	  localStorage.clear()

      try {
        const res = await fetch(url);
        const apiData = await res.json();
		localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData);
        console.log("DATA\n", apiData);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <div id="root">
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <Sidebar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </div>
  );
};

export default App;
