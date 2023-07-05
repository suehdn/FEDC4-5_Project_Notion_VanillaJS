//validation 은 submit전, change 전
// list, editor 의 state
//
export const validateListState = (nextState) => {
  if (!Array.isArray(nextState)) throw new Error("listState가 배열이 아닙니다.");

  if (nextState.length > 0) {
    if (!nextState.every((doc) => doc.hasOwnProperty("id") && doc.hasOwnProperty("title") && doc.hasOwnProperty("documents")))
      throw new Error("listState가 적절한 형태가 아닙니다. ");
    for (const doc of nextState) {
      validateListState(doc.documents);
    }
  }
};
//list 에서 필수는 array인지, 안에 요소가 id, title 이 있는지 ,documnets에서 대해서 반복

//editor는 title, content
export const validateEditorState = (nextState) => {
  if (!typeof nextState === "object") throw new Error("editorState가 object가 아닙니다. ");
  if (!(nextState.hasOwnProperty("title") && nextState.hasOwnProperty("content"))) throw new Error("editorState가 적절한 형태가 아닙니다.");
};
