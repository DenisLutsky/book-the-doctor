import { Injectable, Logger } from '@nestjs/common';

import { PhotoRepository, UserRepository } from '@shared/modules/repositories';
import { IUserInput } from '../interfaces';
import { PhotoDocument, User } from '../schemas';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public constructor(private userRepository: UserRepository, private photoRepository: PhotoRepository) {}

  // TODO: map entity to dto

  public async create(input: Partial<IUserInput>): Promise<User> {
    this.logger.log(`Creating new user`, { input });

    let photo: PhotoDocument;
    if (input.photo) {
      photo = await this.photoRepository.create({ url: input.photo.url });
    }

    return await this.userRepository.create({ ...input, photo: photo && photo.id });
  }

  public async findAll(): Promise<User[]> {
    this.logger.log(`Searching for all users`);

    return await this.userRepository.findMany();
  }

  public async findOne(id: string): Promise<User> {
    this.logger.log(`Searching for user with id: ${id}`);

    return await this.userRepository.findOneById(id);
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
