import App from './App.js';

const $app = document.querySelector('#app');

const DUMMY_DATA = [
  {
    id: 1, // Document id
    title: '노션을 만들자', // Document title
    documents: [
      {
        id: 2,
        title: '블라블라',
        documents: [
          {
            id: 3,
            title: '함냐함냐',
            documents: [],
          },
          {
            id: 5,
            title: '흠냐흠냐',
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'hello!',
    documents: [],
  },
];

new App({
  $target: $app,
  initialState: DUMMY_DATA,
});
