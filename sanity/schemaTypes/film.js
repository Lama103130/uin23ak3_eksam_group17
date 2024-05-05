export default {
    name: 'film',
    title: 'Film',
    type: 'document',
    fields: [
        {
        name: 'imageUrl',
        title: '',
        type: 'image', // bilde 
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
        type: 'reference',
        to: [{ type: 'genre' }], // Corrected reference to the genre type
        
      },
      
    ],
  };