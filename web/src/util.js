export default {
  setCookie(name, value) {
    const exp = new Date();
    exp.setDate(exp.getDate() + 7);
    document.cookie = `${name}=${value}; expires=${exp.toUTCString()}; path=/`;
  },
  delCookie(name) {
    const exp = new Date();
    exp.setDate(exp.getDate() - 1);
    document.cookie = `${name}=; expires=${exp.toUTCString()}; path=/`;
  },
  getCookie(name) {
    const cookie = document.cookie || "";
    for (const ck of cookie.split(";")) {
      const vals = ck.split("=");
      if (vals[0].trim() === name) {
        return vals[1];
      }
    }
  },
  activeSession () {
      return this.getCookie('uid') !== undefined
  }
};
