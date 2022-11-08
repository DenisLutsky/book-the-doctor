import { Logger } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from 'src/modules/users/schemas';
import { MongoError } from './interfaces';

export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  public constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  public async create(input: any): Promise<UserDocument> {
    try {
      return await this.model.create(input);
    } catch (err) {
      const { code, keyValue } = err as MongoError;

      this.logger.error(err);

      if (code === 11000) {
        throw new ConflictException(`There is a record with same value in field ${Object.keys(keyValue)[0]}`);
      }
    }
  }

  public async findOneById(id: string): Promise<UserDocument> {
    try {
      const user = await this.model.findById(new Types.ObjectId(id));

      if (!user) {
        throw new NotFoundException(`No such user with id: ${id}`);
      }

      return user;
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  public async findMany(): Promise<UserDocument[]> {
    try {
      return await this.model.find();
    } catch (err) {
      throw Error(err);
    }
  }

  public async updateOne(id: string, input: any): Promise<UserDocument> {
    try {
      await this.findOneById(id);

      const updated = await this.model.findOneAndUpdate({ _id: new Types.ObjectId(id) }, input, { new: true });

      if (!updated) {
        throw new Error(`Any user wasn\'t updated`);
      }

      return updated;
    } catch (err) {
      const { code, keyValue } = err as MongoError;

      if (code === 11000) {
        throw new ConflictException(`There is a record with same value in field ${Object.keys(keyValue)[0]}`);
      }

      throw err;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.findOneById(id);

      const deleted = await this.model.updateOne({ _id: new Types.ObjectId(id) }, { isDeleted: true });

      if (!deleted.modifiedCount) {
        throw new Error(`Any user wasn\'t updated`);
      }

      return deleted && true;
    } catch (err) {
      throw err;
    }
  }
}
