1. 
Read current Redux state inside a saga
Limit how often an action is handled

That’s exactly what:
select → read state
throttle → limit frequency

2. Goal of Project 6
We will build two small but powerful features:
Part A — select
Read Redux state inside a saga

Part B — throttle
Handle an action at most once in a given time window

3. Real-World Examples
select
Read logged-in user ID
Read current form values
Read pagination state
Read filters before API call

throttle
Button spam prevention
Scroll events
Auto-save
Analytics events

4. We will build
Feature: Auto-save Profile (Simplified)

UI:
[ Update Profile ]
(Click many times)


Behavior:
Button click dispatches SAVE_PROFILE

Saga:
Uses select to read profile data from Redux
Uses throttle to allow save once every 3 seconds
Console logs show when save actually happens

5. 
src/
 ├── features/
 │    └── profile/
 │         ├── profileActions.ts
 │         ├── profileReducer.ts
 │         └── profileSaga.ts


6. 
create 
mkdir src\features\profile

Create profileActions.ts
type nul > src\features\profile\profileActions.ts

```
// Action type constants
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SAVE_PROFILE = "SAVE_PROFILE";

// Action creators
export const updateProfile = (name: string) => ({
  type: UPDATE_PROFILE,
  payload: name,
});

export const saveProfile = () => ({
  type: SAVE_PROFILE,
});

```

7. Preview:
User types name
  ↓
UPDATE_PROFILE → reducer updates state
  ↓
User clicks Save multiple times
  ↓
SAVE_PROFILE → saga (throttle)
  ↓
select profile data
  ↓
save happens at most once every 3 seconds

8. 
create Create profileReducer.ts

This reducer will:
store profile data (name)
be updated synchronously
be read later by the saga

---

type nul > src\features\profile\profileReducer.ts

```
import { UPDATE_PROFILE } from "./profileActions";

// Shape of profile state
interface ProfileState {
  name: string;
}

// Initial state
const initialState: ProfileState = {
  name: "",
};

// Reducer
export function profileReducer(
  state = initialState,
  action: any
): ProfileState {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
}


```

9. 

type nul > src\features\profile\profileSaga.ts

```
import { throttle, select } from "redux-saga/effects";
import { SAVE_PROFILE } from "./profileActions";
import { RootState } from "../../app/store";

// Selector function
const selectProfile = (state: RootState) => state.profile;

// Worker saga
function* handleSaveProfile() {
  // Read latest profile state from Redux
  const profile: ReturnType<typeof selectProfile> = yield select(selectProfile);

  console.log("Saving profile...", profile);
}

// Watcher saga
export function* profileSaga() {
  // Allow SAVE_PROFILE at most once every 3 seconds
  yield throttle(3000, SAVE_PROFILE, handleSaveProfile);
}

```

---
yield select(selectProfile);
This means:

“Give me the current Redux state right now.

10. 

throttle(3000, SAVE_PROFILE, handleSaveProfile)

This means:
“Run handleSaveProfile at most once every 3000 ms.”

Behavior:
First click → runs
Clicks within next 3 seconds → ignored
After 3 seconds → next click runs again
Perfect for:
Save buttons
Analytics
Scroll events

11. Mental Timeline
t = 0s  → SAVE_PROFILE → ✅ runs
t = 1s  → SAVE_PROFILE → ❌ ignored
t = 2s  → SAVE_PROFILE → ❌ ignored
t = 3s  → SAVE_PROFILE → ✅ runs

12. 

13. Add profileSaga to rootSaga.

import { profileSaga } from "../features/profile/profileSaga";

And Add profileSaga() to all([])

14. Sanity Check

15. 

Add profileReducer to the Store

import { profileReducer } from "../features/profile/profileReducer";

And 
profile: profileReducer,

16. optional verification
console.log("Redux state:", store.getState());

Console: 
{
  dummy: {},
  user: { ... },
  search: { ... },
  error: { ... },
  profile: {
    name: string
  }
}


17. Update App.tsx for profile auto-save.

What the UI will do
Input → dispatch UPDATE_PROFILE
Button → dispatch SAVE_PROFILE
Saga:
select → read latest profile
throttle → limit save frequency
Console shows when save actually happens

```

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
        style={{ padding: "8px 16px" }}
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

```

18. 
Reducers store state.
Sagas read state and control side effects.

19. Optional (update the button style to)
    backgroundColor: "#2563eb", // blue
    color: "#ffffff",           // white text
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,

    or Tailwind version: 

    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer font-medium border-none"

19. 
Test

Expected Output: 
Open browser console
Type a name
Click Save Profile rapidly (5–10 times)

You’ll see:
Saving profile... { name: "John" }

➡️ Only once every 3 seconds, no matter how many clicks.

This proves:
throttle works
Saga controls side effects

