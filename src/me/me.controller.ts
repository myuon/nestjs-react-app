import { Controller, Get } from '@nestjs/common';

@Controller('/me')
export class MeController {
  @Get()
  getMe(): { name: string; now: number } {
    return {
      name: 'John',
      now: Date.now(),
    };
  }
}
