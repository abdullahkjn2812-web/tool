import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  // Password Generator Function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+{}[]:><?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  // Copy to clipboard function
  const copyToClipboard = useCallback(() => {
    inputRef.current?.select();
    password.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-start pt-12 px-4">
      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl p-10 shadow-lg">
        <h1 className="text-white text-5xl font-bold text-center mb-8">
          Password generator
        </h1>

        {/* Password input */}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={password}
            className="w-full rounded-lg px-5 py-4 text-xl bg-white text-black placeholder-gray-400 outline-none"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          >
            Copy
          </button>
        </div>

        {/* Password Length Slider */}
        <div className="flex items-center gap-x-4 mt-6">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
            <span className="text-white">Length: {length}</span>
          </div>
        </div>

        {/* Options for Numbers and Special Characters */}
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setnumberAllowed((prev) => !prev)}
            />
            <span className="text-white">Numbers</span>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={() => setcharacterAllowed((prev) => !prev)}
            />
            <span className="text-white">Characters</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
