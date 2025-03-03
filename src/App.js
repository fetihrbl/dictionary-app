import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  const getMeaning = async () => {
    if (!searchWord.trim()) return;
    try {
      const response = await Axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
  };

  const playAudio = () => {
    if (data?.phonetics?.length > 0 && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    }
  };

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        <input 
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getMeaning()}
        />
        <button onClick={getMeaning}>
          <FaSearch size="20px" />
        </button>
      </div>
      {data ? (
        <div className="showResults">
          <h2>
            {data.word} {" "}
            {data.phonetics?.length > 0 && data.phonetics[0].audio && (
              <button onClick={playAudio}>
                <FcSpeaker size="26px" />
              </button>
            )}
          </h2>
          <h4>Parts of speech:</h4>
          <p>{data.meanings?.[0]?.partOfSpeech || "N/A"}</p>
          <h4>Definition:</h4>
          <p>{data.meanings?.[0]?.definitions?.[0]?.definition || "No definition available."}</p>
          <h4>Example:</h4>
          <p>{data.meanings?.[0]?.definitions?.[0]?.example || "No example available."}</p>
        </div>
      ) : (
        <p className="noResults">Type a word and press Enter to search.</p>
      )}
    </div>
  );
}

export default App;