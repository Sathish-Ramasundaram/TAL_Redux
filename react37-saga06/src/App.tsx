import { useDispatch, useSelector } from "react-redux";
import { updateProfile, saveProfile } from "./features/profile/profileActions";
import { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => state.profile);

  return (
    <div style={{ padding: 40 }}>
      <h2>Project 6 – select & throttle (Profile Auto-Save)</h2>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter name"
          value={profile.name}
          onChange={(e) => dispatch(updateProfile(e.target.value))}
          style={{ padding: 8, width: 250 }}
        />
      </div>

      <button
        onClick={() => dispatch(saveProfile())}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer font-medium border-none"
      >
        Save Profile
      </button>

      <p style={{ marginTop: 16 }}>
        Current name in Redux: <strong>{profile.name}</strong>
      </p>
    </div>
  );
}

export default App;
