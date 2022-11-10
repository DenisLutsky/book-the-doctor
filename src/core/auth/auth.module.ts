import { forwardRef, Module } from '@nestjs/common';

import { UsersModule } from '@core/modules';
import { AuthService } from './services';
import { AuthController } from './controllers';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
