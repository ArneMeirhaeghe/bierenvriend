import pb from "./PocketbaseService";

class FavService {
  constructor({ user, error, setFav }) {
    this.db = pb;
    this.user = user;
    this.error = error;
    this.setFav = setFav;
  }

  async getAllFavByUser(userID) {
    try {
      const favorites = await this.db.collection("favorites").getFullList({
        filter: `userID = "${userID}"`,
      });
      this.setFav(favorites);
    } catch (error) {
      this.error(error.message);
    }
  }

  async addFavorite(userID, productID) {
    try {
      const newFav = await this.db.collection("favorites").create({
        userID,
        productID,
      });
      this.setFav((prevFav) => [...prevFav, newFav]);
      return newFav;
    } catch (error) {
      this.error(error.message);
    }
  }

  async removeFavorite(favoriteId) {
    console.log(favoriteId);
    try {
      await this.db.collection("favorites").delete(favoriteId);
      this.setFav((prevFav) => prevFav.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      this.error(error.message);
    }
  }
}

export default FavService;
