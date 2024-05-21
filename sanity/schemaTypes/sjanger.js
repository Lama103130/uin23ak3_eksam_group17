export default {
  name: 'genre',
  title: 'Sjanger',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
      
    },
    {
      name: 'films',
      title: 'Filmer',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'film' }] }],
      
    },
    
  ],
};
