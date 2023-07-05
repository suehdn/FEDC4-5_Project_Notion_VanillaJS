import PostEditor from './PostEditor.js';
import { request } from '../util/api.js';

export default function PostPage({ $target, initialState }) {
  const $page = document.createElement('div');

  this.state = initialState;

  let timer = null;

  const postEditor = new PostEditor({
    $target: $page,
    initialState: { title: '', content: '' },
    onEditing: async (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const isNew = this.state.postId === 'new';
        if (isNew) {
          const createdPost = await request('/', {
            method: 'POST',
            body: JSON.stringify({
              ...post,
              parentId: null,
            }),
          });
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          this.setState({
            postId: createdPost.id,
          });
        } else {
          await request(`/${this.state.postId}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: post.title,
              content: post.content,
            }),
          });
        }
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;

      // postId가 변경됨 - new
      if (this.state.postId === 'new') {
        this.render();
        postEditor.setState({
          title: '',
          content: '',
        });

        // postId가 변경됨 - 다른 Id
      } else {
        await fetchPost();
      }
      return;
    }
    this.state = nextState;

    postEditor.setState(this.state.post);

    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== 'new') {
      const post = await request(`/${postId}`);
      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
