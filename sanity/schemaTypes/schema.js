import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Importer egendefinerte schemas
import film from "./film";
import sjanger from "./sjanger";
import bruker from "./bruker";

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    film,
    sjanger,
    bruker,
  ])
});
