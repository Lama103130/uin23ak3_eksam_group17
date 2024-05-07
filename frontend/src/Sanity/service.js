// service.js

import client from "./client";

export const brukerInfo = async () => {
    const brukere = await client.fetch(`*[_type == "user"]{username, favoriteGenres[], wishlist[], favorites[]}`);
    return brukere;
};

export const filmInfo = async () => {
    const filmer = await client.fetch(`*[_type == "film"]{title, genre->{name}, director, releaseDate}`);
    return filmer;
};

export const sjangerInfo = async () => {
    const sjangere = await client.fetch(`*[_type == "genre"]{name, films[]}`);
    return sjangere;
};
