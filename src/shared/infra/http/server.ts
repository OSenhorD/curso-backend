import { createServer } from 'http';

import app from '@/shared/infra/http/app';
import '@/shared/infra/http/app-routes';
import '@/shared/infra/http/app-errors';

const server = createServer(app);

const port = Number(process.env.PORT || 5500);
server.listen(port, () => console.log(`Server is running in port ${port}!`));
