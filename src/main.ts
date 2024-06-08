import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';
import { getViewsPaths } from './app.util';
import { ServerMode } from './app.types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();
export const serverMode: ServerMode =
  (process.env.SERVER_MODE as ServerMode) || 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (serverMode === 'ssr' || serverMode === 'full') {
    app.engine(
      'hbs',
      hbs.engine({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: join(__dirname, '..', 'src/views/layouts'),
        partialsDir: join(__dirname, '..', 'src/views/partials'),
      }),
    );
    app.setViewEngine('hbs');
    app.useStaticAssets(join(__dirname, '..', 'public'));
    const views = getViewsPaths();

    console.log('Loading views', views);
    app.setBaseViewsDir(views);
  }

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
