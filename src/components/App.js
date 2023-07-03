import Document from "./Document";

export default function App({ $target }) {
  const hotionDocument = new Document({ $target });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      hotionDocument.setState({ documentId: 0 });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      hotionDocument.setState({ documentId });
    }
  };

  this.route();
}
