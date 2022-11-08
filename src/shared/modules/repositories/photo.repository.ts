import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Photo, PhotoDocument } from 'src/modules/users/schemas';

export class PhotoRepository {
  public constructor(@InjectModel(Photo.name) private model: Model<PhotoDocument>) {}

  public async create(input: any): Promise<PhotoDocument> {
    return await this.model.create(input);
  }
}
