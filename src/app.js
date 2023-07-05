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
      <div class="main-content">
      </div>
    </div>
  `

  this.render = () => {
    console.log("rendered")
    new NavBar({ $target: $target.querySelector(".nav-bar"), loadDocument: this.route })
    new SideBar({ $target: $target.querySelector(".side-bar"), loadDocument: this.route, renderApp: this.render })
  }

  this.route = () => {
    const { pathname } = window.location
    console.log(pathname)
    if (pathname === "/") {
      $target.querySelector(".main-content").innerHTML = ""
    }
    if (pathname.indexOf("/documents") === 0) {
      const [, , id] = pathname.split("/")
      editor.setState({ id })
    }
  }

  window.addEventListener("popstate", () => {
    this.route()
    this.render()
  })

  const editor = new MainContent({
    $target: $target.querySelector(".main-content"),
    initialState: initialState,
    renderApp: this.render,
    routeApp: this.route,
  })

  this.route()
  this.render()
}
