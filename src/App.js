import { fetchAPI } from './util/api.js';
export default function App({ $target }) {
  const request = async () => {
    let res = await fetchAPI('/');
    console.log(res);
  };

  request();
}
