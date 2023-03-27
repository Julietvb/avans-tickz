import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Types } from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { QueryStatistics, ResultSummary } from 'neo4j-driver';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async findById(userId: string): Promise<User> {
    return await this.userModel.findOne({ _id: new Types.ObjectId(userId) });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ emailAdres: email });
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return await this.userModel.find(usersFilterQuery);
  }

  async create(user: User): Promise<User> {
    const newUser = await new this.userModel(user).save();
    // const newUser = this.userModel.create(user);

    const userNeo = await this.neo4jService.write(
      `CREATE (:User {id: '${newUser._id}'})`
    );
    //     const categoryNeo = await this.neo4jService.write(MERGE (:Category {name: "${ticketdb.category.name}"}))
    //     const relationNeo = await this.neo4jService.write(MATCH (t:Ticket {id: "${ticketdb.id}"}), (c:Category {name: "${ticketdb.category.name}"}) CREATE (t)-[:BELONGS_TO]->(c))
    return newUser;
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>
  ): Promise<User> {
    // console.log(userFilterQuery)
    // console.log(user)
    return await this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }

  async deleteById(userId: string) {
    return await this.userModel.deleteOne({ _id: new Types.ObjectId(userId) });
  }

  async addToFavorite(
    loggedInUserId: Types.ObjectId,
    artistId: Types.ObjectId
  ): Promise<User> {

    await this.neo4jService.write(
      `MATCH (follower:User {id: '${loggedInUserId}'})
      MATCH (artist:Artist {id: '${artistId}'})
      MERGE (follower)-[:LIKES]->(artist)`
    );

    const updatedUser = this.userModel.findOneAndUpdate(
      { _id: loggedInUserId },
      { $push: { favoriteArtists: artistId._id } },
      { new: true }
    );

    return updatedUser;
  }

  async follow(
    loggedInUserId: Types.ObjectId,
    followUserId: Types.ObjectId
  ): Promise<User> {

    await this.neo4jService.write(
      `MATCH (follower:User {id: '${loggedInUserId}'})
      MATCH (following:User {id: '${followUserId}'})
      MERGE (follower)-[:FOLLOWS]->(following)`
    );

    const updatedUser = this.userModel.findOneAndUpdate(
      { _id: loggedInUserId },
      { $push: { following: followUserId._id } },
      { new: true }
    );

    return updatedUser;
  }

  async unfollow(
    loggedInUserId: Types.ObjectId,
    unFollowUserId: Types.ObjectId
  ): Promise<User> {
    await this.neo4jService.write(
      `MATCH (a)-[r:FOLLOWS]->(b)
      WHERE a.id = '${loggedInUserId}' AND b.id = '${unFollowUserId}'
      DELETE r`
    );

    const updatedUser = this.userModel.findOneAndUpdate(
      { _id: loggedInUserId },
      { $pull: { following: unFollowUserId } },
      { new: true }
    );

    return updatedUser;
  }
}
