import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private service: SyncService) {}

  @Get()
  async sync(@Query('key') key: string) {
    if (key != 'onlygitlabmaydeploy') {
      throw new UnauthorizedException();
    }
    return this.service.sync();
  }
}
