// ex props
// {
//   $target : $app,
//   initialState : localStorage.getItem("ex"),
//   props : {
//     events : {
//       {
//         action : 'click',
//         tag : 'button',
//         callback : pushUrl,
//       },
//       {
//         action : 'submit',
//         tag : 'button',
//         callback : addPost,
//       },
//     }
//   }
// }

export default class Component{
 #$target; #state; #props; 

  constructor({$target, initialState={}, props={}}){
    this.#$target = $target
    this.#state = initialState
    this.#props = props
    this.setEvent(this.#props.events)
    this.render()
  }

  setEvent(events){
    events.forEach(event => this.addEventDelegation(event))
  }

  render(){}

  addEventDelegation({action, tag, callback}){
    this.#$target.addEventListener(action, (event) => {
      if(event.target.closest(`${tag}`)){
        callback(event)
      }
    })
  }

  get state(){
    return this.#state
  }

  set state(newState){
    this.#state = newState
    this.render()
  }

  get $target(){
    return this.#$target
  }

  get props(){
    return this.#props
  }
}