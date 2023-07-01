import Component from "./Component.js";

export default class DocumentTree extends Component{

  render(){
    this.getTemplate(this.state).forEach(child => this.$target.appendChild(child))
  }

  getTemplate(documentTree){
    
    return documentTree.map(doc => {
      const $li = document.createElement('li');
      $li.textContent = doc.title;
      $li.id = `document-${doc.id}`
     
      $li.innerHTML = `
        <a href="/document/${doc.id}">${doc.title}</a>
        <button data-id="${doc.id}">+</button>
      `
  
      if (doc.documents.length > 0) {
        const $ul = document.createElement('ul');
        const children = this.getTemplate(doc.documents);
        children.forEach(child => $ul.appendChild(child));
        $li.appendChild($ul);
      }
  
      return $li;
    });
  }
}