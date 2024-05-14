// bruker.js

export default {
  name: 'user',
  title: 'Bruker',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Brukernavn',
      type: 'string',
      
    },
    {
      name: 'favoriteGenres',
      title: 'Favorittsjangre',
      type: 'array',
      of: [{ type: 'reference',
      to: [{ type: 'genre' }] }],
      
    },
    {
      name: 'wishlist',
      title: 'Ønskeliste',
      type: 'array',
      of: [{ type: 'reference',
      to: [{ type: 'film' }] }],
      
    },
    {
      name: 'favorites',
      title: 'Favorittfilmer',
      type: 'array',
      of: [{ type: 'reference',
      to: [{ type: 'film' }] }],
      
    },
    
  ],
};
