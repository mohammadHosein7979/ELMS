import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import * as dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
