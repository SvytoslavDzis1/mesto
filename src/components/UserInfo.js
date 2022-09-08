class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      nameInfo: this._name.textContent,
      jobInfo: this._job.textContent,
      avatarInfo: this._avatar.src
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}

export {UserInfo};
