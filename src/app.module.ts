import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './app/health.controller';
import { HealthDbController } from './app/health-db.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProjectsModule],
  controllers: [AppController, HealthController, HealthDbController],
  providers: [AppService],
})
export class AppModule {}