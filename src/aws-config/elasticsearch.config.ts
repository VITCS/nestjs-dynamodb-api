import { Client } from '@elastic/elasticsearch';

export const elasticsearchConfig = {
    node: 'http://localhost:9200', // Replace with your Elasticsearch endpoint
};

export const elasticsearchProvider = {
    provide: 'Elasticsearch',
    useValue: new Client(elasticsearchConfig),
};
