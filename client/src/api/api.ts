export const apiRequest = async (
  url: string,
  errorMsg: string,
  options?: RequestInit,
) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(`${errorMsg} (${error.message})`);
    }
  }
};
