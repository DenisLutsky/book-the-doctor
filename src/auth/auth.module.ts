import { forwardRef, Module } from '@nestjs/common';

import { AuthService } from './services';
import { AuthController } from './controllers';
import { UsersModule } from 'src/modules';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
