import { getDocuments } from '../api';
import { localStorageKeys } from '../constants/localStorageKeys';
import { getItem, setItem } from '../utils/storage';

export function getFreshDocuments() {
  const documentsStaleTime = getItem(localStorageKeys.DOCUMENTS_STALE_TIME);
  if (documentsStaleTime < Date.now()) {
    return getDocuments().then((documents) => {
      setItem(localStorageKeys.DOCUMENTS_STALE_TIME, Date.now() + 5000);
      setItem(localStorageKeys.DOCUMENTS, documents);
      return documents;
    });
  } else {
    return Promise.resolve(getItem(localStorageKeys.DOCUMENTS));
  }
}
