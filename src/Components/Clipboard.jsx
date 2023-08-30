import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ApiCall from './component/ApiCall'


const Clipboard = () => {
  const [text, setText] = useState("");

  const copyText = () => {
    const clipboard = new Clipboard(".copy-to-clipboard");
    clipboard.writeText(text);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text to copy"
        onChange={(e) => setText(e.target.value)}
      />
      <CopyToClipboard
        text={text}
        onCopy={() => alert("Text copied to clipboard!")}
        className="copy-to-clipboard"
      />
    </div>
  );
};

export default Clipboard;