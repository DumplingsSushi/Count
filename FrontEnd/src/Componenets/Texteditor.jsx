import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../Storage/Usersave";

const Textedit = () => {
  const [saved, setSaved] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    fontFamily: "Arial",
  });

  useEffect(() => {
    const getSaved = () => {
      const data = localStorage.getItem("userData");
      return data ? JSON.parse(data) : [];
    };

    const loadedData = getSaved();
    console.log(loadedData);

    setSaved(loadedData);

    if (loadedData.length > 0) {
      setFontStyle(loadedData[0]?.fontStyle || fontStyle);
    }
  }, []);

  useEffect(() => {
    if (saved.length > 0) {
      setFontStyle(saved[currentIndex]?.fontStyle || {
        bold: false,
        italic: false,
        fontFamily: "Arial",
      });
    }
  }, [currentIndex, saved]);

  const handleNext = () => {
    if (saved.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % saved.length);
    }
  };

  const handlePrevious = () => {
    if (saved.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + saved.length) % saved.length);
    }
  };

  const deleteCurrentRecord = () => {
    if (saved.length > 0) {
      const updatedData = saved.filter((_, index) => index !== currentIndex);
      setSaved(updatedData);
      localStorage.setItem("userData", JSON.stringify(updatedData));

      setCurrentIndex(Math.max(0, updatedData.length - 1));
    }
  };

  const saveCurrentStyle = () => {
    if (saved.length > 0) {
      const updatedData = saved.map((item, index) =>
        index === currentIndex ? { ...item, fontStyle } : item
      );
      setSaved(updatedData);
      localStorage.setItem("userData", JSON.stringify(updatedData));
    }
  };

  const toggleBold = () => {
    setFontStyle((prev) => ({ ...prev, bold: !prev.bold }));
  };

  const toggleItalic = () => {
    setFontStyle((prev) => ({ ...prev, italic: !prev.italic }));
  };

  const changeFontFamily = (font) => {
    setFontStyle((prev) => ({ ...prev, fontFamily: font }));
  };

  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto mt-10 rounded-xl bg-slate-600 p-6 text-white">
        <Provider store={store}>
          <div className="App">
            {saved.length > 0 ? (
              <div>
                <h2 className="font-bold">Saved Data</h2>
                {["name", "address", "email", "phone"].map((key) => (
                  <p
                    key={key}
                    className="text-lg mt-2 p-4 bg-white text-black rounded"
                    style={{
                      fontWeight: fontStyle.bold ? "bold" : "normal",
                      fontStyle: fontStyle.italic ? "italic" : "normal",
                      fontFamily: fontStyle.fontFamily,
                    }}
                  >
                    {saved[currentIndex]?.data[key] || `No ${key} available`} {/* Corrected access */}
                  </p>
                ))}
              </div>
            ) : (
              <p>No saved data found</p>
            )}
          </div>
        </Provider>
      </div>

      <div className="p-4 flex justify-center gap-4 flex-wrap">
        <button
          onClick={handlePrevious}
          className="bg-orange-200 px-4 py-2 rounded-2xl disabled:opacity-50"
          disabled={saved.length === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-orange-200 px-4 py-2 rounded-2xl disabled:opacity-50"
          disabled={saved.length === 0}
        >
          Next
        </button>
        <button
          type="button"
          onClick={deleteCurrentRecord}
          className="bg-red-500 text-white font-bold px-4 py-2 rounded-2xl hover:bg-red-600 transition duration-200 disabled:opacity-50"
          disabled={saved.length === 0}
        >
          Delete Current Record
        </button>
      </div>


      <div className="p-2 flex justify-center gap-4 flex-wrap">
        <button onClick={toggleBold} className="bg-gray-300 px-4 py-2 rounded-lg">
          Bold
        </button>
        <button onClick={toggleItalic} className="bg-gray-300 px-4 py-2 rounded-lg">
          Italic
        </button>
        <button onClick={() => changeFontFamily("Arial")} className="bg-gray-300 px-4 py-2 rounded-lg">
          Arial
        </button>
        <button onClick={() => changeFontFamily("Times New Roman")} className="bg-gray-300 px-4 py-2 rounded-lg">
          Times New Roman
        </button>
        <button onClick={() => changeFontFamily("Courier New")} className="bg-gray-300 px-4 py-2 rounded-lg">
          Courier New
        </button>
      </div>

      <div className="p-4 flex justify-center">
        <button
          type="button"
          onClick={saveCurrentStyle}
          className="bg-green-500 text-white font-bold px-4 py-2 rounded-2xl hover:bg-green-600 transition duration-200 disabled:opacity-50"
          disabled={saved.length === 0}
        >
          Save Font Style
        </button>
      </div>
    </div>
  );
};

export default Textedit;
