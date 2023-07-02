import SideBarHeader from './sidebar/SideBarHeader.js';
import SideBarItem from './sidebar/SideBarItem.js';

export default function NotionSideBar({ $target, initialState }) {
    const $sideBar = document.createElement('div');
    $sideBar.className = 'sidebar';
    $target.appendChild($sideBar);
    console.log(initialState);

    //나중에 스토리지로 변경해야함!
    new SideBarHeader({ $target: $sideBar, initialState: this.state });
    new SideBarItem({ $target: $sideBar, initialState: this.state });
}
