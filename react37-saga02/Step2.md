continuation 
9. Add userReducer to store.

update store.ts

import { userReducer } from "./userReducer";

And
Before: 
reducer: {
  dummy: dummyReducer,
},


After: 
reducer: {
  dummy: dummyReducer,
  user: userReducer,
},

---

Redux now has:
A real reducer
A real state tree
A place to store fetched data

10. Test
Add this temporary log in store.ts after store creation:
console.log("Initial Redux state:", store.getState());

In console, you would see: 
{
  dummy: {},
  user: {
    loading: false,
    user: null,
    error: null
  }
}

Remove the log after checking

11. Update App.tsx
Dispatch FETCH_USER when the app loads
Read user state from Redux
Show:
Loading text
User name
Error (if any)

Replace with this code: 
```

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


```
12. Test 
Immediately:
Loading user...

After 2 seconds:
User Name: John Doe

No console errors
No warnings
Saga + Redux fully working ✅

13. Completed so far: 
✔ Why reducers exist
✔ How Saga fetches data
✔ How Saga dispatches actions
✔ How Redux stores async data
✔ How UI reads Redux state
✔ Full Redux + Saga lifecycle