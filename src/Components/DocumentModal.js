export function DocumentModal(id , onSubmit){
    const $app = document.querySelector('.app');
    const $modalContainer = document.createElement('div')
    $modalContainer.className = 'modal'
    $app.appendChild($modalContainer);
    this.render = () => {
        $modalContainer.innerHTML = `
                <div class="modal-content">
                    <form>
                        <input class ="modalText" type="text" placeholder='문서의 제목을 작성해주세요'/>
                    </form>
                    <button class="closeBtn" id="close-modal">닫기</button>
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
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // 스크롤바 제
    }
    this.render()
}