import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import pkg from '../../package.json';
import publicRoute from '../routes/public.route';
import counterRoute from '../routes/counter.route';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('pkg', pkg);
app.get('/api', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});

app.use('/api/public', publicRoute);
app.use('/api/counter', counterRoute);

export default app;