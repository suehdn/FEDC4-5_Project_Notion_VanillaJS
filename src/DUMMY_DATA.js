export const DOCUMENT_TREE_DUMMY_DATA = [
  {
    id: "document-1", // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: "document-1-1",
        title: "블라블라",
        documents: [
          {
            id: "document-1-2",
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: "document-2",
    title: "hello!",
    documents: [],
  },
];

export const DOCUMENT_DUMMY_DATA = {
  id: 1,
  title: "노션을 만들자",
  content: "즐거운 자바스크립트의 세계!",
  documents: [
    {
      id: 2,
      title: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  createdAt: "",
  updatedAt: "",
};
