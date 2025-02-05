import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("count")) || 0; // Retrieve count from localStorage
  });

  useEffect(() => {
    localStorage.setItem("count", count); // Save count to localStorage
  }, [count]);

  const getBackgroundColor = (count) => {
    const r = Math.min(255, 100 + count * 15);
    const g = Math.min(255, 200 - count * 10);
    const b = Math.min(255, 255 - count * 5);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [bgColor, setBgColor] = useState(getBackgroundColor(count));

  useEffect(() => {
    setBgColor(getBackgroundColor(count));
  }, [count]);

  // Animate background color smoothly
  const springProps = useSpring({
    to: { backgroundColor: bgColor },
    config: { duration: 800 }, // Smooth transition duration
    onChange: ({ value }) => {
      document.body.style.backgroundColor = value.backgroundColor; // Apply animation to body
      localStorage.setItem("bgColor", value.backgroundColor); // Save bg color to localStorage
    },
  });

  useEffect(() => {
    const savedBgColor = localStorage.getItem("bgColor");
    if (savedBgColor) {
      document.body.style.backgroundColor = savedBgColor; // Restore background color
    }
  }, []);

  const countColor =
    count > 0 ? "text-black-600" : count < 0 ? "text-red-600" : "text-gray-700";

  return (
    <animated.div
      style={springProps}
      className="w-[85%] h-[25vh] p-5 rounded-xl shadow-lg transition-all mt-10 mx-9"
    >
      <h1 className="text-center font-bold text-lg">Counter</h1>
      <span className={`block mt-2 text-3xl font-semibold text-center ${countColor}`}>
        {count}
      </span>
      <div className="flex justify-around mt-2 p-1">
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-200"
        >
          +
        </button>
        <button
          onClick={() => {
            setCount(0);
            localStorage.setItem("bgColor", getBackgroundColor(0)); // Reset bg color
          }}
          className="px-4 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition duration-200"
        >
          Reset
        </button>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200"
        >
          -
        </button>
      </div>
    </animated.div>
  );
};

export default Counter;
