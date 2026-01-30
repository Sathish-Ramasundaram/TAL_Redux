
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, saveProfile } from "./features/profile/profileActions";
import { RootState } from "./app/store";

import { startTask, cancelTask } from "./features/task/taskActions";

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



      
      <h2>Project 7 – race & cancel (Task Control)</h2>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button
          onClick={() => dispatch(startTask())}
          className="px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
        >
          Start Task
        </button>

        <button
          onClick={() => dispatch(cancelTask())}
          className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700"
        >
          Cancel Task
        </button>
      </div>

      <p style={{ marginTop: 20, color: "#555" }}>
        Open the browser console to see saga logs.
      </p>
    </div>
  );
}

export default App;
