"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elasticsearchProvider = exports.elasticsearchConfig = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
exports.elasticsearchConfig = {
    node: 'http://localhost:9200',
};
exports.elasticsearchProvider = {
    provide: 'Elasticsearch',
    useValue: new elasticsearch_1.Client(exports.elasticsearchConfig),
};
//# sourceMappingURL=elasticsearch.config.js.map