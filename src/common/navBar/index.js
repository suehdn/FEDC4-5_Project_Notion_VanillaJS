export default function NavBar({ $target, initialState = [] }) {
  this.render = () => {
    $target.innerHTML = `
        <a href="/">NoNotion</a>
      `
  }

  this.render()
}
