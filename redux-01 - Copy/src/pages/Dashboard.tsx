import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, logoutRequest } from "../store/authSlice";
import { checkInventoryRequest } from "../store/inventorySlice";
import { bundleRequest } from "../store/bundleSlice";
import {
  syncStartRequest,
  syncStopRequest,
} from "../store/syncSlice";





function Dashboard() {
  const dispatch = useDispatch();

  const items = useSelector(
  (state: any) => state.inventory.items
);

const bundle = useSelector((state: any) => state.bundle);
const [sidebarOpen, setSidebarOpen] = useState(false);

const syncRunning = useSelector(
  (state: any) => state.sync.running
);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

  {/* Top bar */}
  <div className="flex justify-end mb-6">
    <button
      onClick={() => dispatch(logoutRequest())}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  </div>




  <div className="absolute top-6 left-6">

  <button
  onClick={() => {
    setSidebarOpen(true);
    dispatch(bundleRequest());
  }}
    className="text-2xl"
  >
    👤
  </button>
</div>



{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/30"
    onClick={() => setSidebarOpen(false)}
  />
)}


<div
  className={`
    fixed top-0 left-0 h-full w-80 bg-white shadow-xl p-6
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>

  <h3 className="text-lg font-semibold mb-4">
    Profile Panel
  </h3>

  {bundle.profile && (
    <div className="text-sm mb-4">
      <div><b>Name:</b> {bundle.profile.name}</div>
      <div><b>Role:</b> {bundle.profile.role}</div>
      <div><b>Last Login:</b> {bundle.profile.lastLogin}</div>
    </div>
  )}

  {bundle.stats && (
    <div className="text-sm mb-4">
      <div><b>Orders:</b> {bundle.stats.orders}</div>
      <div><b>Users:</b> {bundle.stats.users}</div>
      <div><b>Tasks:</b> {bundle.stats.tasks}</div>
    </div>
  )}

  {bundle.notifications.length > 0 && (
    <ul className="text-sm list-disc list-inside">
      {bundle.notifications.map((n: string, i: number) => (
        <li key={i}>{n}</li>
      ))}
    </ul>
  )}

</div>



  {/* Main content */}
  <div className="flex gap-8 justify-center">

    {/* Card 1 — Chat */}
    <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

      <Link
        to="/chat"
        className="text-blue-600 underline text-sm"
      >
        Open Chat Demo
      </Link>
    </div>

    {/* Card 2 — Inventory */}
    <div className="bg-white shadow-lg rounded-xl p-8 w-96">
      <h3 className="font-semibold mb-3">
        Inventory Items
      </h3>

      <ul className="list-disc list-inside text-sm text-gray-700">
        {items.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <button
        onClick={() => dispatch(checkInventoryRequest())}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Check Availability (Saga select)
      </button>
    </div>

    {/* Card — Fork/Cancel Demo */}
<div className="bg-white shadow-lg rounded-xl p-8 w-96 text-left">

  <h3 className="font-semibold mb-3">
    Background Sync (fork/cancel)
  </h3>

  <div className="flex gap-3 mb-3">
    <button
      onClick={() => dispatch(syncStartRequest())}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Start Sync
    </button>

    <button
      onClick={() => dispatch(syncStopRequest())}
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Stop Sync
    </button>
  </div>

  <p className="text-sm text-gray-600">
    Status: {syncRunning ? "Running…" : "Stopped"}
  </p>

</div>

{/* Card — Mail Throttle Demo */}
<div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

  <h3 className="font-semibold mb-3">
    Mail Undo (Throttle)
  </h3>

  <Link
  to="/mail"
  className="text-blue-600 underline text-sm"
>
  Open Mailbox Demo
</Link>


</div>







  </div>
</div>

  );
}

export default Dashboard;
