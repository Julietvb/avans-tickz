import { Injectable } from '@nestjs/common';
import { Neo4jService } from './entities/neo4j/neo4j.service';
import { Types } from 'mongoose';

@Injectable()
export class AppService {
  /**
   *
   */
  constructor( private readonly neo4jService: Neo4jService) {
    
  }
  async getData(): Promise<string> {
    const result = await this.neo4jService.read('MATCH(n) RETURN count(n) AS count', {})
    const count = result.records[0].get('count')
    return `Hello Neo4j user! There are ${count} nodes in the database`
  }


  async getReccommendations(
    loggedInUserId: Types.ObjectId
  ): Promise<string[]> {
    const recs = await this.neo4jService.read(
      `MATCH (me:User {id: '${loggedInUserId}'})-[:FOLLOWS]->(following:User)-[:LIKES]->(artist:Artist)
      WHERE NOT EXISTS((:User {id: '${loggedInUserId}'})-[:LIKES]->(artist))
      RETURN DISTINCT artist.id`
    );

    const ids = recs.records.map(record => record.get("artist.id"))

    return ids
  }
}
