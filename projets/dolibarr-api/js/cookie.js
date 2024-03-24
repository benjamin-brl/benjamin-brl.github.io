function createCookie(name, value, days) {
  const expire = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const cookie = `${name}=${encodeURIComponent(value)}; expires=${expire.toUTCString()}`;
  document.cookie = cookie;
  return cookie;
}

function deleteCookie(name) {
  var expire = new Date();
  expire.setTime(expire.getTime() - 24 * 60 * 60 * 1000);
  document.cookie = name + "=; expires=" + expire.toGMTString();
}

function getCookie(name) {
  return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`), "$1");
}