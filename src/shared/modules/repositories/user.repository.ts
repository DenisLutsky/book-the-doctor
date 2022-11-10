import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

import { User, UserDocument } from '@core/modules/users/schemas';

export class UserRepository {
  public constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  public async create(input: Partial<User>): Promise<UserDocument> {
    try {
      const existing = await this.findOneWithFilter({ email: input.email });

      if (existing) throw new ConflictException(`There is a record with same email`);
    } catch (err) {
      if (!(err instanceof NotFoundException)) {
        throw err;
      }

      return await this.model.create(input);
    }
  }

  public async findOneById(id: string): Promise<UserDocument> {
    const user = await this.model.findById(new Types.ObjectId(id));

    if (!user) {
      throw new NotFoundException(`No such user with id: ${id}`);
    }

    return user;
  }

  public async findOneWithFilter(input: Partial<User>): Promise<UserDocument> {
    const filter: FilterQuery<User> = { ...input };

    const user = await this.model.findOne(filter);

    if (!user) {
      throw new NotFoundException(`No such user`);
    }

    return user;
  }

  public async findMany(): Promise<UserDocument[]> {
    return await this.model.find();
  }

  public async updateOne(id: string, input: Partial<User>): Promise<UserDocument> {
    await this.findOneById(id);

    const updated = await this.model.findOneAndUpdate({ _id: new Types.ObjectId(id) }, input, { new: true });

    if (!updated) {
      throw new Error(`Any user wasn\'t updated`);
    }

    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    await this.findOneById(id);

    const deleted = await this.model.updateOne({ _id: new Types.ObjectId(id) }, { isDeleted: true });

    if (!deleted.modifiedCount) {
      throw new Error(`Any user wasn\'t updated`);
    }

    return deleted && true;
  }
}
