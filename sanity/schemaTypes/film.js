export default {
    name: 'film',
    title: 'Film',
    type: 'document',
    fields: [
      {
        name: 'poster',
        title: 'Poster',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'title',
        title: 'Tittel',
        type: 'string',
        
      },
      {
        name: 'imdbId',
        title: 'IMDB ID',
        type: 'string',
        
      },
      {
        name: 'genre',
        title: 'Sjanger',
        type: 'reference', to: [{ type: 'genre' }], 
        
      },
      
    ],
  };