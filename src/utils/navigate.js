export const NAVIGATE_EVENT_KEY = 'navigate';

export const navigate = (nextUrl) => {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT_KEY, { detail: { nextUrl } }));
};
