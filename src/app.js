import SideBar from "./common/sideBar"
import NavBar from "./common/navBar"
import MainContent from "./common/mainContent"

export default function App({ $target, initialState = [] }) {
  $target.innerHTML = `
    <div class="nav-bar"></div>
    <div class="side-bar"></div>
    <div class="main-content"></div>
  `

  this.render = () => {
    new NavBar({ $target: $target.querySelector(".nav-bar") })
    new SideBar({ $target: $target.querySelector(".side-bar") })
    new MainContent({ $target: $target.querySelector(".main-content") })
  }

  this.render()
}
