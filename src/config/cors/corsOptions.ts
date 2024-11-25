import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const customCorsOptions = {
  origin: configService.get('ALLOWED_ORIGIN'),
};
