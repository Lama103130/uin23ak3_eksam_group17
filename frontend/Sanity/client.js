import { createClient } from '@sanity/client';

const options = {
    projectId: "x7i1ezim", 
    dataset: "production"
}

const client = createClient({
    ...options,
    apiVersion: 'v2022-03-07',
    useCdn: true
});

export default client;
