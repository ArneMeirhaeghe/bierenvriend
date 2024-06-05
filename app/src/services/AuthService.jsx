import pb from "./PocketbaseService";

class AuthService {
  constructor({ user, error }) {
    this.db = pb;
    this.user = user;
    this.error = error;

    this.login = this.login.bind(this);
    this.adminLogin = this.adminLogin.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.loginFromCookies = this.loginFromCookies.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async login(usrn, ps) {
    try {
      const authData = await this.db
        .collection("users")
        .authWithPassword(usrn, ps);
      if (authData) {
        this.setUserModel(authData);
        return { type: true };
      } else {
        this.error("Er is iets misgegaan");
        return { type: false, message: "Login failed" };
      }
    } catch (e) {
      this.error(e.message);
      return { type: false, message: e.message };
    }
  }

  async adminLogin(usrn, ps) {
    const authData = await this.db.admins.authWithPassword(usrn, ps);
    return authData;
  }

  async register({ username, password, name, email, role }) {
    try {
      const authData = await this.db.collection("users").create({
        username: username,
        password: password,
        passwordConfirm: password,
        name: name,
        email: email,
        role: role,
      });
      if (authData) {
        const loginResponse = await this.login(username, password);
        return loginResponse;
      } else {
        this.error("Er is iets misgegaan");
        return { type: false, message: "Registration failed" };
      }
    } catch (e) {
      this.error(e.message);
      return { type: false, message: e.message };
    }
  }

  async loginFromCookies() {
    const dataModel = {
      record: this.db.authStore.model,
      token: this.db.authStore.token,
    };
    this.setUserModel(dataModel);
  }

  logout() {
    const authData = this.db.authStore.clear();
    this.user.setUser(false);
    return authData;
  }

  setUserModel(data) {
    this.user.setUser({
      avatar: data.record.avatar,
      email: data.record.email,
      emailVisibility: data.record.emailVisibility,
      username: data.record.username,
      role: data.record.role,
      id: data.record.id,
      verified: data.record.verified,
    });
  }

  async getUserById(userId) {
    try {
      const user = await this.db.collection("users").getOne(userId);
      return user;
    } catch (error) {
      console.error("Failed to fetch user", error);
      return null;
    }
  }
  async getAllUsers() {
    console.log("getting all users");
    try {
      const users = await pb.collection("users").getFullList();
      console.log(users);
      return users;
    } catch (error) {
      console.log("Failed to fetch users", error);
      console.error("Failed to fetch users", error);
      return null;
    }
  }

  get isLoggedIn() {
    return this.db.authStore.isValid;
  }
  async updateUser(userID, data) {
    const record = await pb.collection("users").update(userID, data);
    console.log(record);
  }
}

export default AuthService;
