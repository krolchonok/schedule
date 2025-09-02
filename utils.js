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
  return Object.prototype.hasOwnProperty.call(cookies, key);
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

function setCookie(name, value, years = 10) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + years);
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}`;
}
