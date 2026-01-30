import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root"); 

if (!container) { // !container means container === null OR container === undefined OR any “falsy” value
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);