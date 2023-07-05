import storage from "../../utils/storage"
import { userName } from "../../config/apiConfig"

export default function NavBar({ $target, loadDocument }) {
  const onClickTitle = () => {
    history.pushState(null, null, "/")
    loadDocument()
  }
  this.render = () => {
    $target.innerHTML = `
        <div class='title'>NoNotion</div>
        <div class='currentUser'>
        `
    $target.querySelector(".title").addEventListener("click", onClickTitle)
    $target.querySelector(".currentUser").innerHTML = `${storage.getItem("currentUser") ?? userName}님 환영합니다.`
  }

  this.render()
}
