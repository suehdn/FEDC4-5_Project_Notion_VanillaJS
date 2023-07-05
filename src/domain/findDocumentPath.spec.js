import { findDocumentPath } from './findDocumentPath';

test('문서의 경로를 찾는 findDocumentPath 함수 테스트', () => {
  const documents = [
    {
      id: 1,
      documents: [
        {
          id: 2,
          documents: [
            {
              id: 3,
              documents: [],
            },
          ],
        },
      ],
    },
  ];

  expect(findDocumentPath(documents, 3)).toEqual([1, 2, 3]);
  expect(findDocumentPath(documents, 4)).toEqual(null);
  expect(findDocumentPath(documents, 1)).toEqual([1]);
});
