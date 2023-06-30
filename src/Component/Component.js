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
 _$target; _state; _props; 

  constructor({$target, initialState={}, props={}}){
    this._$target = $target
    this._state = initialState
    this._props = props
    this.setEvent(this._props.events)
    this.render()
  }

  setEvent(events){
    if(events) events.forEach(event => this.setEventDelegation(event))
  }

  render(){}

  setEventDelegation({action, tag, callback}){
    this._$target.addEventListener(action, (event) => {
      if(event.target.closest(`${tag}`)){
        callback(event)
      }
    })
  }

  get state(){
    return this._state
  }

  set state(newState){
    this._state = newState
    this.render()
  }

  get $target(){
    return this._$target
  }

  get props(){
    return this._props
  }
}