import { Client } from '@elastic/elasticsearch';
export declare const elasticsearchConfig: {
    node: string;
};
export declare const elasticsearchProvider: {
    provide: string;
    useValue: Client;
};
