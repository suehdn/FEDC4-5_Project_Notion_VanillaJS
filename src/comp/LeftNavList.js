import LeftNavListBoxMaker from "./LeftNavListBoxMaker.js" // 칸 하나 만드는 함수

export default function LeftNavList({ $target , initState}){
  const $LeftNavList = document.createElement('div')
  $LeftNavList.className = 'LeftNavList'
  $target.appendChild($LeftNavList)

  this.state = initState

  this.setState = newState =>{
    this.state = newState
    this.render()
  }
  const defaultPadding = 0 // 시작 기본 패딩량 
  const addPadding = 25    // 재귀시 더해질 패딩량
  
  /**
   * @param $target 
   * @param paddingLeft 초기패딩값. 하위요소로 재귀할수록 증가
   * @param initDocuments Nav트리 데이터
   */
  this.makeLeftNav = ( $target , paddingLeft, doms )=>{

    doms.forEach( ({ title, documents, id }) => {
      const { $navbox, $subDomsBox } = LeftNavListBoxMaker(paddingLeft,title,id) 
      const Q_haveSubDocuments = documents.length > 0 

      $target.appendChild( $navbox )

      if ( Q_haveSubDocuments ){
        this.makeLeftNav( $subDomsBox, paddingLeft + addPadding , documents )
      } 
    })
  }

  this.render = () => {

    $LeftNavList.innerHTML =  ''

    this.makeLeftNav( $LeftNavList, defaultPadding , this.state )
  }

  this.render()
}


