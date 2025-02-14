import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [blocks, setBlocks] = useState([
    {
      id: 0,
      text: "",
      message: undefined,
      error: "",
    },
  ]);

  const addBlock = () => {
    setBlocks([
      ...blocks,
      { id: blocks.length + 1, text: "", message: undefined, error: "" },
    ]);
    console.log(blocks);
  };

  const updateBlock = (e, id) => {
    const indexToManipulate = blocks.findIndex((block) => block.id === id);
    blocks[indexToManipulate].text = e.target.value;
  };

  const runEval = (id) => {
    try {
      const codeToEval = blocks[id].text;
      const output = eval(codeToEval);
      blocks[id].message = output;

      console.log("output", output);
    } catch (error) {
      console.log("error", error);
      blocks[id].error = error;
      console.log("blocks on error", blocks);
    }
  };


  return (
    <div className="App">
      <div className="blockWrapper">
        {blocks.map((block) => {
          return (
            <div key={block.id} className="block">
              <textarea
                className="textarea"
                onChange={(e) => updateBlock(e, block.id)}
              />
              <button className="button" onClick={() => runEval(block.id)}>
                Run
              </button>

              <div className="output">
                {block.message ? block.message : block.error}
              </div>
            </div>
          );
        })}
      </div>
      <button className="button" onClick={addBlock}>
        Add new block
      </button>
    </div>
  );
}

export default App;
