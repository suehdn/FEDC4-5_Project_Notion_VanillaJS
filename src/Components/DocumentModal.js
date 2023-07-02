export function DocumentModal(id , onSubmit){
    const $app = document.querySelector('.app');
    const $modalContainer = document.createElement('div')
    $modalContainer.className = 'modal'
    $app.appendChild($modalContainer);
    this.render = () => {
        $modalContainer.innerHTML = `
                <div class="modal-content">
                    <form>
                        <input type="text" placeholder='문서의 제목을 작성해주세요'/>
                    </form>
                    <button id="close-modal">닫기</button>
                </div>
        `
        const $form = document.querySelector('form');
        $form.addEventListener('submit', (e) => {
            e.preventDefault();
            const $input = $form.querySelector('input');
            const content = $input.value;
            onSubmit(content, id);
            $input.value =''
            const modal = document.querySelector('.modal');
            modal.style.display = "none";
    })
    }
    this.modalOpen = () => {
        const modal = document.querySelector('.modal');
            //this.setState({isModalOpen: true})
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // 스크롤바 제
    }
    this.render()
    // const modal = document.getElementById("modal");
    // const openModalBtn = document.getElementById("open-modal");
    // const closeModalBtn = document.getElementById("close-modal");
    // // 모달창 열기
    // openModalBtn.addEventListener("click", () => {
    //     modal.style.display = "block";
    //     document.body.style.overflow = "hidden"; // 스크롤바 제거
    // });
    // // 모달창 닫기
    // closeModalBtn.addEventListener("click", () => {
    // modal.style.display = "none";
    // document.body.style.overflow = "auto"; // 스크롤바 보이기
    //});

}