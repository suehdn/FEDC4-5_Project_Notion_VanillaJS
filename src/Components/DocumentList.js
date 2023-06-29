export function DocumentList({$target, data =[], depth = 0, initialState}) {
    this.state = initialState
    this.setState = (nextState) => {
        this.state = nextState
    }
    this.render = ($renderDOM = $target) => {
        data.map((data) => {
            var doc = document.createElement('li');
            doc.setAttribute("data-id", `${data.id}`);
            doc.setAttribute("class", `doc`);
            doc.textContent =`${data.title}`
            $renderDOM.insertAdjacentElement("beforeend", doc);
        })
    }
          
    this.onSelect = (data, $li) => {
        data.forEach((data => {
            const $parentNode = document.createElement('div')
            $parentNode.className = `doc-${this.state.selectedNode}`
            $li.append($parentNode);
            const documentList = new DocumentList({
                $target: $parentNode,
                data: [data],
                depth: this.state.depth + 1,
                initialState: this.state
            })
            documentList.render();
        }))
    }
    $target.addEventListener('click', (e) => {
        e.stopPropagation();
        if($target.classList.contains('documentPage') && !e.target.classList.contains('doc')){
            return
        }
        if(this.state.isOpen){
            while(e.target.querySelector('div')){
                const $removeTarget = e.target.querySelector('div')
                e.target.removeChild($removeTarget);
            }
            this.setState({
                ...this.state,
                isOpen: !this.state.isOpen,
                
            })
            return
        }
        const $li = e.target
        if($li){
            const { id } = $li.dataset;
            if(data){
                const childrenData = data.map(data => data.documents)
                if(childrenData[0].length > 0){
                    this.setState({
                        parent: depth === 0 ? id : parseInt(this.state.parent),
                        selectedNode: parseInt(id),
                        isOpen: !this.state.isOpen,
                        depth: this.state.depth + 1
                    })
                    console.log(this.state)
                    this.onSelect(childrenData[0], $li)
                }
            }
        }    
    })
}