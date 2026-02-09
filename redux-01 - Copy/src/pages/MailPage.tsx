import { useDispatch, useSelector } from "react-redux";
import {
  sendMailRequest,
  undoMailRequest,
} from "../store/mailSlice";



function MailPage() {
  const dispatch = useDispatch();

  const mail = useSelector((state: any) => state.mail);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

        <h2 className="text-xl font-bold mb-4">
          Mailbox (Throttle Demo)
        </h2>

        <p className="mb-6 text-gray-600">
          {mail.statusText}
        </p>

        {!mail.sent && (
          <button
            onClick={() => dispatch(sendMailRequest())}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Mail
          </button>
        )}

        {mail.sent && mail.undoAvailable && (
          <button
            onClick={() => dispatch(undoMailRequest())}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Undo
          </button>
        )}

        {mail.sent && !mail.undoAvailable && (
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            Undo Expired
          </button>
        )}

      </div>
    </div>
  );
}

export default MailPage;
