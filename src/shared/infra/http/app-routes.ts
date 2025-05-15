import app from '@/shared/infra/http/app';
import router from '@/shared/infra/http/routes';
import ensureParams from '@/shared/infra/http/middlewares/ensure-params';

app.use((req, _, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use('/api/v1', [ensureParams], router);
