
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./features/error/errorActions";
import { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.error
  );

  return (
    <div style={{ padding: 40 }}>
      <h2>Project 4 – Error Handling with Redux-Saga</h2>

      <button
        onClick={() => dispatch(fetchData())}
        style={{ padding: "8px 16px" }}
      >
        Fetch Data (Fail)
      </button>

      <div style={{ marginTop: 20 }}>
        {loading && <p>Loading...</p>}

        {data && <p>Data: {data}</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
    </div>
  );
}

export default App;
