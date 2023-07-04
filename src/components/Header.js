export default function Header({$target}){
    const $header = document.createElement("div")
    $header.innerHTML = "노션 만들어보기"
    $target.appendChild($header)
}