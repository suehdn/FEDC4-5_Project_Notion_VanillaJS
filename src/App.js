import Category from './components/DocumentList.js';
import PostEditPage from './components/PostEditPage.js';
import { initRouter } from './router.js';

export default function App({ $target }) {
  $target.style.display = 'flex';
  const $left = document.createElement('div');
  $left.className = 'left';
  $target.appendChild($left);

  const $right = document.createElement('div');
  $right.className = 'right';
  $target.appendChild($right);

  const postEditPage = new PostEditPage({
    $target: $right,
    initialState: {
      postId: 'new',
      post: { title: '', content: '' },
    },
  });

  new Category({
    $target: $left,
    initialState: {
      template: '',
      documents: [],
    },
  });

  this.route = () => {
    $right.innerHTML = '';
    const { pathname } = window.location;

    if (pathname.indexOf('/posts/') === 0) {
      const [, , id] = pathname.split('/');
      postEditPage.setState({
        ...postEditPage.state,
        postId: id,
      });
    } else if (pathname === '/') {
      $right.innerHTML = '';
    }
  };
  this.route();
  initRouter(() => this.route());
}
