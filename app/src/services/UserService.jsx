import pb from "./PocketbaseService";
import User from "../models/User"; // Zorg ervoor dat het pad correct is

export default class UserService {
  constructor({ user, setUser, error }) {
    this.user = user;
    this.setUser = setUser;
    this.error = error;
    this.db = pb;

    this.updateUser = this.updateUser.bind(this);
  }

  async updateUser(userId, updatedData) {
    try {
      const response = await this.db
        .collection("users")
        .update(userId, updatedData);
      const updatedUser = new User(response); // Maak een nieuwe User instantie met de response data
      this.setUser(updatedUser); // Zorg ervoor dat setUser correct wordt aangeroepen
      return updatedUser;
    } catch (error) {
      this.error(error.message);
      throw error;
    }
  }
}
