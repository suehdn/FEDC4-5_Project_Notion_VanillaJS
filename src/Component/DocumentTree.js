import Component from "./Component.js";

export default class DocumentTree extends Component{

  render(){
    console.log(this.state)

    // const productCategoriesElement = document.getElementById('productCategories');
    // const $docTree = createCategoryTree(productCategories);
    // categoryTree.forEach(category => productCategoriesElement.appendChild(category));

    // this.$target.forEach(category => this.$target.appendChild($docTree));
    console.log(this.getTemplate(this.state))
    this.$target.innerHTML = this.getTemplate(this.state);
  }

  getTemplate(documentTree){
    
    return documentTree.map(doc => {
      const $li = document.createElement('li');
      $li.textContent = doc.title;
      $li.id = `document-${doc.id}`
      console.log($li.innerHTML)
  
      if (doc.documents.length > 0) {
        const $ul = document.createElement('ul');
        const children = this.getTemplate(doc.documents);
        children.forEach(child => $ul.appendChild(child));
        $li.appendChild($ul);
      }
  
      return $li;
    });
  }
  //   const $documentLi = createElement('ul')
  //   $documentLi.innerHTML =`
  //     ${documentTree.map(document => {
  //       `        
  //       <li id="document-${document.id}" class="document">
  //         <a href='documents=${document.id}'>${document.title}</a>
  //         <button class="documentAddButton">+</button>
  //       </li>
  //       `
  //     }).join('')}
      
  //   `
  // }
}