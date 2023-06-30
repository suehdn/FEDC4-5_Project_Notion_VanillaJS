import SideBar from "./common/sideBar"
import NavBar from "./common/navBar"
import MainContent from "./common/mainContent"

export default function App({ $target, initialState = [] }) {
  $target.innerHTML = `
    <div class="nav-bar"></div>
    <div class="main-container">
      <div class="side-bar"></div>
      <div class="main-content"></div>
    </div>
  `

  this.render = () => {
    new NavBar({ $target: $target.querySelector(".nav-bar") })
    new SideBar({ $target: $target.querySelector(".side-bar") })
  }

  this.route = () => {
    const { pathname } = window.location
    const editor = new MainContent({
      $target: $target.querySelector(".main-content"),
      initialState: {
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
      },
    })

    if (pathname.indexOf("/documents") === 0) {
      const [, , id] = pathname.split("/")
      editor.setState({ id })
    }
  }

  this.render()
  this.route()
}
