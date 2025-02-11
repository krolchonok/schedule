function getCookies() {
  const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    cookies[name] = value;
    return cookies;
  }, {});
  return cookies;
}

function checkCookie(key) {
  const cookies = getCookies();
  return cookies.hasOwnProperty(key);
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
