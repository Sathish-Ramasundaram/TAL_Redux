import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "./searchActions";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();

  const { loading, query, result, error } = useSelector(
    (state: RootState) => state.search
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(e.target.value));
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Project 3 – Search with takeLatest</h2>

      <input
        type="text"
        placeholder="Search user..."
        value={query}
        onChange={handleChange}
        style={{ padding: 8, width: 250 }}
      />

      <div style={{ marginTop: 20 }}>
        {loading && <p>Searching...</p>}
        {result && <p>{result}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
