import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './app/health.controller';
import { HealthDbController } from './app/health-db.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { BudgetsModule } from './budgets/budgets.module';
import { ComponentsModule } from './components/components.module';
import { ActivitiesModule } from './activities/activities.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { PtbaModule } from './ptba/ptba.module';
import { LogframeModule } from './logframe/logframe.module';
import { RisksModule } from './risks/risks.module';
import { PpmModule } from './ppm/ppm.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProjectsModule, OrganisationsModule, BudgetsModule, ComponentsModule, ActivitiesModule, ExpensesModule, ApprovalsModule, PtbaModule, LogframeModule, RisksModule, PpmModule],
  controllers: [AppController, HealthController, HealthDbController],
  providers: [AppService],
})
export class AppModule {}