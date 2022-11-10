import { Injectable, Logger } from '@nestjs/common';

import { hashPassword } from '@core/auth/utils';
import { PhotoRepository, UserRepository } from '@shared/modules/repositories';
import { IUserInput } from '../interfaces';
import { PhotoDocument, User, UserDocument } from '../schemas';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public constructor(private userRepository: UserRepository, private photoRepository: PhotoRepository) {}

  // TODO: add mapper

  public async create(input: Partial<IUserInput>): Promise<UserDocument> {
    this.logger.log(`Creating new user`, { input });

    let photo: PhotoDocument;
    if (input.photo?.url) {
      photo = await this.photoRepository.create({ url: input.photo.url });
    }

    const hashedPassword = await hashPassword(input.password);

    return await this.userRepository.create({ ...input, password: hashedPassword, photo: photo && photo.id });
  }

  public async findAll(): Promise<UserDocument[]> {
    this.logger.log(`Searching for all users`);

    return await this.userRepository.findMany({});
  }

  public async findManyWithFilter(filter: Partial<User>): Promise<UserDocument[]> {
    this.logger.log(`Searching for users with filter`, { filter });

    return await this.userRepository.findMany(filter);
  }

  public async findOneById(id: string): Promise<User> {
    this.logger.log(`Searching for user with id: ${id}`);

    return await this.userRepository.findOneById(id);
  }

  public async findOneWithFilter(input: Partial<User>, init = false): Promise<UserDocument> {
    this.logger.log(`Searching for user with filter`, { input });

    return await this.userRepository.findOneWithFilter(input, init);
  }

  public async update(id: string, input: Partial<IUserInput>): Promise<User> {
    this.logger.log(`Updating for user with id: ${id}`, { id, input });

    // TODO: add photo update
    // if (input.photo.url) {
    //   await this.photoRepository.update()
    // }

    return await this.userRepository.updateOne(id, { ...input, photo: input.photo.id });
  }

  public async remove(id: string): Promise<boolean> {
    this.logger.log(`Deleting user with id: ${id}`);

    return await this.userRepository.delete(id);
  }
}
