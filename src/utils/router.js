export const ROUTE_CHANGE_EVENT_NAME = "route-change";
// 상수화 필요
export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const id = e.detail;
    history.pushState(null, null, `/documents/${id}`);
    onRoute();
  });
};

export const push = (id) => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, { detail: id }));
};
