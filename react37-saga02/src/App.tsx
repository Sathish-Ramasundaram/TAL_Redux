import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userActions";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(
    (state: RootState) => state.user
  );

  // Dispatch FETCH_USER when app loads
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Project 2 – Fetch User</h2>

      {loading && <p>Loading user...</p>}

      {user && <p>User Name: {user.name}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
