export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? accessToken : null;
};

export const setAccessToken = (access_token) => {
  if (access_token) {
    localStorage.setItem("accessToken", access_token);
  } else {
    localStorage.clear();
  }
};
