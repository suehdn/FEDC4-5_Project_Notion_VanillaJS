import { userName } from "./config/apiConfig"

export default function App({ $target, initialState = [] }) {
  this.render = () => {
    $target.innerHTML = `
      <h1>Hello, Vanilla!</h1>
      <h1>Hello, ${userName}</h1>
    `
  }

  this.render()
}
