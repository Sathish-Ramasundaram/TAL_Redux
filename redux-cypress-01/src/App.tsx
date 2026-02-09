import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const { text, loading } = useSelector(
    (state: RootState) => state.data
  );

  return (
    <div style={{ padding: 40 }}>
      <button
        data-testid="fetch-btn"
        onClick={() => dispatch({ type: "FETCH_REQUEST" })}
      >
        Fetch Data
      </button>

      {loading && <p data-testid="loading">Loading...</p>}
      {text && <p data-testid="result">{text}</p>}
    </div>
  );
}

export default App;
