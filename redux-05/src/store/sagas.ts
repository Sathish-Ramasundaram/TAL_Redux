import {
  put,
  call,
  delay,
  takeLatest,
  takeEvery,
  select,
  race,
  take,
  all,
  fork,
  cancel,
  throttle,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { startLoading, stopLoading } from './appSlice';
import { fetchDemoStatus } from '../api/demoApi';
import { loginApi } from '../api/authApi';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  otpStart,
  otpSubmitRequest,
  otpSuccess,
  otpTimeout,
  otpFailure,
} from './authSlice';
import { sendChatApi } from '../api/chatApi';
import { sendMessageRequest, sendMessageSuccess } from './chatSlice';
import { availableApi, demandApi } from '../api/inventoryApi';
import { checkInventoryRequest } from './inventorySlice';
import { verifyOtpApi } from '../api/otpApi';
import {
  fetchProfileApi,
  fetchNotificationsApi,
  fetchStatsApi,
} from '../api/dashboardBundleApi';

import { bundleRequest, bundleSuccess, bundleFailure } from './bundleSlice';
import {
  syncStarted,
  syncStartRequest,
  syncStopRequest,
  syncStopped,
} from './syncSlice';
import {
  sendMailRequest,
  undoMailRequest,
  mailSent,
  mailUndone,
  undoExpired,
} from './mailSlice';

let syncTask: any = null;

// worker saga
function* startLoadingWorker(): SagaIterator {
  try {
    const result: any = yield call(fetchDemoStatus);
    console.log('Saga got:', result);

    yield put(stopLoading());
  } catch (e) {
    console.log('Saga error', e);
    yield put(stopLoading());
  }
}

//

function* loginWorker(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const { email, password } = action.payload;

    yield call(loginApi, email, password);

    yield put(loginSuccess());
  } catch (e: any) {
    yield put(loginFailure(e.message));
  }
}

// logout -

function* logoutWorker(): SagaIterator {
  yield delay(800); // simulate cleanup
  yield put(logoutSuccess());
}

//

function* sendMessageWorker(
  action: ReturnType<typeof sendMessageRequest>
): SagaIterator {
  const text = action.payload;

  const result: string = yield call(sendChatApi, text);

  yield put(sendMessageSuccess(result));
}

function* inventoryCheckWorker(): SagaIterator {
  const items: string[] = yield select((state: any) => state.inventory.items);

  const count = items.length;

  console.log('Saga select count:', count);

  if (count >= 4) {
    yield call(availableApi);
  } else if (count >= 1) {
    yield call(demandApi);
  } else {
    console.log('No items — skip API');
  }
}

function* otpRaceWorker(): SagaIterator {
  const result: any = yield race({
    submit: take(otpSubmitRequest.type),
    timeout: delay(3000),
  });

  if (result.timeout) {
    yield put(otpTimeout());
    return;
  }

  try {
    const otp = result.submit.payload;

    yield call(verifyOtpApi, otp);

    yield put(otpSuccess());
  } catch (e: any) {
    yield put(otpFailure(e.message));
  }
}

function* bundleWorker(): SagaIterator {
  try {
    const [profile, notifications, stats] = yield all([
      call(fetchProfileApi),
      call(fetchNotificationsApi),
      call(fetchStatsApi),
    ]);

    yield put(
      bundleSuccess({
        profile,
        notifications,
        stats,
      })
    );
  } catch (e) {
    yield put(bundleFailure());
  }
}

function* syncWorker(): SagaIterator {
  yield put(syncStarted());

  let i = 1;

  while (true) {
    console.log('sync tick', i++);
    yield delay(1000);
  }

  // never reached normally — only if cancelled
  // (we’ll handle that next step)
}

function* startSyncFlow(): SagaIterator {
  if (!syncTask) {
    syncTask = yield fork(syncWorker);
  }
}

function* stopSyncFlow(): SagaIterator {
  if (syncTask) {
    yield cancel(syncTask);
    syncTask = null;
    yield put(syncStopped());
  }
}



function* sendMailWorker(): SagaIterator {
  console.log("MAIL: sending");

  yield delay(500);

  yield put(mailSent());

  console.log("MAIL: sent — undo window open");

  yield delay(10000);

  yield put(undoExpired());

  console.log("MAIL: undo window expired");
}



function* undoMailWorker(): SagaIterator {
  const undoAvailable = yield select(
    (state: any) => state.mail.undoAvailable
  );

  if (!undoAvailable) {
    return;
  }

  console.log("UNDO accepted");

  yield put(mailUndone());
}


// watcher saga
export function* rootSaga() {
  yield takeLatest(startLoading.type, startLoadingWorker);
  yield takeLatest(loginRequest.type, loginWorker);
  yield takeLatest(logoutRequest.type, logoutWorker);
  yield takeEvery(sendMessageRequest.type, sendMessageWorker);
  yield takeLatest(checkInventoryRequest.type, inventoryCheckWorker);
  yield takeLatest(otpStart.type, otpRaceWorker);
  yield takeLatest(bundleRequest.type, bundleWorker);
  yield takeLatest(syncStartRequest.type, startSyncFlow);
  yield takeLatest(syncStopRequest.type, stopSyncFlow);
  yield takeLatest(sendMailRequest.type, sendMailWorker);
yield throttle(
  10000,
  undoMailRequest.type,
  undoMailWorker
);
}
