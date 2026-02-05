import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageRequest } from "../store/chatSlice";

function ChatDemo() {
  const dispatch = useDispatch();
  const { messages, sending } = useSelector(
    (state: any) => state.chat
  );

  const [text, setText] = useState("");


  const handleSend = () => {
    if (!text.trim()) return;

    dispatch(sendMessageRequest(text));
    setText("");
  };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    handleSend();
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[420px]">

        <h2 className="text-xl font-bold mb-4">
          Chat Send Demo (takeEvery)
        </h2>

        <div className="border rounded p-3 h-48 overflow-y-auto mb-4 bg-gray-50">
          {messages.length === 0 && (
            <p className="text-sm text-gray-400">
              No messages yet
            </p>
          )}

          {messages.map((m: string, i: number) => (
            <div
              key={i}
              className="bg-blue-100 px-3 py-1 rounded mb-2 text-sm"
            >
              {m}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type message..."
            className="flex-1 border rounded px-3 py-2"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        {sending && (
          <p className="text-xs text-gray-500 mt-2">
            Sending...
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatDemo;
