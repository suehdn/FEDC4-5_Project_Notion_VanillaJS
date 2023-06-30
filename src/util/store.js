import { request } from "./api.js";

export default class store {
  constructor() {
    this.state = {
      documentsTree: [
        {
          id: 1,
          title: "테스트",
          documents: [],
        },
        {
          id: 1, // Document id
          title: "노션을 만들자", // Document title
          documents: [
            {
              id: 2,
              title: "블라블라",
              documents: [
                {
                  id: 3,
                  title: "함냐함냐",
                  documents: [],
                },
              ],
            },
            {
              id: 4,
              title: "랄라랄라",
              documents: [
                {
                  id: 5,
                  title: "함하함하",
                  documents: [],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          title: "hello!",
          documents: [],
        },
      ],
      documentContent: {},
      selectDocumentId: 0,
    };
  }

  setState(nextState) {
    this.state = nextState;
  }

  async documentsGet() {
    const documentsTree = await request("/documents");
    this.setState({ ...this.state, documentsTree });
  }
}
