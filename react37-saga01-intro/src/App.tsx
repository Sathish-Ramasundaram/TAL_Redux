import { useDispatch } from "react-redux";
import { buttonClicked } from "./actions";

function App() {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 40 }}>
      <button
      className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer font-medium border-none"
        onClick={() => dispatch(buttonClicked())}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
