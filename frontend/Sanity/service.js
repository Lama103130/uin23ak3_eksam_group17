import client from "./client";

export const brukerInfo = async () => {
  try {
    const brukere = await client.fetch(`*[_type == "user"]{
      _id,
      username,
      favoriteGenres[]->{
        _id,
        name
      },
      wishlist[]->{
        title,
        poster,
        imdbId
      },
      favorites[]->{
        _id,
        title
      }
    }`);
    return brukere;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return [];
  }
};

export const filmInfo = async () => {
  try {
   
    const brukere = await brukerInfo();
    const favoriteFilmIds = brukere.flatMap(user => user.favorites.map(fav => fav._id));
    if (favoriteFilmIds.length === 0) return [];

    const filmer = await client.fetch(`*[_type == "film" && _id in $favoriteFilmIds]{
      _id,
      title,
      genre->{
        name
      },
      director,
      releaseDate
    }`, { favoriteFilmIds });
    return filmer;
  } catch (error) {
    console.error("Error fetching film info:", error);
    return [];
  }
};

export const sjangerInfo = async () => {
  try {
    const sjangere = await client.fetch(`*[_type == "genre"]{
      _id,
      name,
      films[]->{
        _id,
        title
      }
    }`);
    return sjangere;
  } catch (error) {
    console.error("Error fetching genre info:", error);
    return [];
  }
};
