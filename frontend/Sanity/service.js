import client from "./client";

export const brukerInfo = async () => {
  const brukere = await client.fetch(`*[_type == "user"]{_id, username, favoriteGenres[], wishlist[]{title, poster, imdb_id}, favorites[]}`);
  return brukere;
};

export const filmInfo = async () => {
  const filmer = await client.fetch(`*[_type == "film"]{_id, title, genre->{name}, director, releaseDate}`);
  return filmer;
};

export const sjangerInfo = async () => {
  const sjangere = await client.fetch(`*[_type == "genre"]{_id, name, films[]}`);
  return sjangere;
};
