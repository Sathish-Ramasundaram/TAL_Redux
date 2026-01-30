continuation

11. Add searchReducer to the Redux Store

update: store.ts

import { searchReducer } from "./searchReducer";

----
After: 
reducer: {
  dummy: dummyReducer,
  user: userReducer,
  search: searchReducer,
},

12. Optional verify: 

Add temporarily (after store creation):

console.log("Redux state:", store.getState());

You should see all three keys: dummy, user, search.
Remove after checking.

13. Update App.tsx for search.

Replace with this code: 
```

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

```
14. Test
No flickering
No outdated results

15. Optional (change the delay from searchSaga)

function searchUserApi(query: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Results for "${query}"`);
    }, 1000); // 👈 THIS is the 1 second delay
  });
}

