const POPSTATE_EVENT = 'popstate';
const HISTORY_PUSH_EVENT = 'history-push';

const initPopstateEventListener = (onRoute) => {
  window.addEventListener(POPSTATE_EVENT, () => {
    onRoute();
  });
};

const initHistoryPushEventListener = (onRoute) => {
  window.addEventListener(HISTORY_PUSH_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    window.history.pushState(null, null, nextUrl);
    onRoute();
  });
};

export const initRouter = (onRoute) => {
  initPopstateEventListener(onRoute);
  initHistoryPushEventListener(onRoute);
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(HISTORY_PUSH_EVENT, {
      detail: { nextUrl },
    })
  );
};
