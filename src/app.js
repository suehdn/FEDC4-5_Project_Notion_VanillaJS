import SideBar from "./common/sideBar"
import NavBar from "./common/navBar"
import MainContent from "./common/mainContent"

const dummyData = {
  id: 0,
  title: "Welcome! NoNotion",
  content: "안녕하세요. NoNotion입니다.",
}

export default function App({ $target, initialState = dummyData }) {
  $target.innerHTML = `
    <div class="nav-bar"></div>
    <div class="main-container">
      <div class="side-bar"></div>
      <div class="main-content"></div>
    </div>
  `

  const editor = new MainContent({
    $target: $target.querySelector(".main-content"),
    initialState: initialState,
  })

  this.render = () => {
    new NavBar({ $target: $target.querySelector(".nav-bar") })
    new SideBar({ $target: $target.querySelector(".side-bar") })
  }

  this.route = () => {
    const { pathname } = window.location
    if (pathname.indexOf("/documents") === 0) {
      const $mainContent = $target.querySelector(".main-content")
      $mainContent.innerHTML = ""
      const [, , id] = pathname.split("/")
      editor.setState({ id })
    }
  }

  this.render()
  this.route()
}
