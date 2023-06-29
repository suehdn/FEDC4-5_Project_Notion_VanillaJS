import Component from "./Component/Component.js"

export default class App extends Component{

  render(){
    this.$target.innerHTML = `
      <div>안녕!</div>
    `
  }
}