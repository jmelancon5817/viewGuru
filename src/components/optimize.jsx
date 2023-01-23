import React, { useState } from "react";

const Optimize = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // optimization logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter video URL or ID"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Optimize</button>
      </form>
    </div>
  );
};

export default Optimize;
