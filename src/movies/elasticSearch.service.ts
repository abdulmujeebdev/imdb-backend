import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchService {
    constructor(private readonly esService: ElasticsearchService) { }

    async addDocument(index: string, payload: any) {
        const data = await this.esService.index({
            index,
            id: payload.id,
            document: payload
        })

        return data;
    }

    async updateDocument(indexName: string, docId: number, payload: any) {
        const Id = docId.toString();

        if (!payload['id']) {
            payload['id'] = docId;
        }
        const data = await this.esService.update({
            index: indexName,
            id: Id,
            doc: payload
        })

        return data;
    }

    async deleteDocument(index: string, id: number) {
        const Id = id.toString();
        return await this.esService.deleteByQuery({
            index: index,
            body: {
                query: {
                    match: { _id: Id }
                }
            }
        })
    }

    async search(index: string, query: object = {}) {
        const result = await this.esService.search({
            index: index,
            body: {
                query: {
                    match: query,
                },
            },
        });

        return result.hits.hits;
    }
}
