
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "./store/appSlice";

function App() {
  const loading = useSelector((state: any) => state.app.loading);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

        <h1 className="text-2xl font-bold mb-6">
          Redux + Saga Demo
        </h1>

        <div className="mb-6">
          <span className="text-sm text-gray-500">
            Loading State
          </span>

          <div
  data-testid="status-text"
  className={`mt-2 text-lg font-semibold
    ${loading ? "text-green-600" : "text-red-600"}
  `}
>
  {loading ? "ACTIVE" : "INACTIVE"}
</div>


        </div>

        <div className="flex gap-3">

          <button
  data-testid="start-btn"
  onClick={() => dispatch(startLoading())}
  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Start
</button>

<button
  data-testid="stop-btn"
  onClick={() => dispatch(stopLoading())}
  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
>
  Stop
</button>


        </div>

      </div>
    </div>
  );
}

export default App;
