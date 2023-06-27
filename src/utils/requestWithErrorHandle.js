export async function requestWithErrorHandle(url, option) {
  try {
    const res = await fetch(url, option);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status} Error`);
    }
  } catch (error) {
    console.log(error.message);
  }
}
