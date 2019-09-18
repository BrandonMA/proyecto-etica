import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routers/AuthRouter';
import documentsRouter from './routers/DocumentsRouter';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

mongoose.connect('mongodb://brandon:Pudin098@ds017258.mlab.com:17258/teste', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

app.use(cors());

app.use(express.static(path.resolve('./public')));

// Auth calls
app.use('/api/auth', authRouter);
app.use('/api/documents', documentsRouter);

// Render html for dist
app.use('*', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

app.listen(3000, () => {
    console.log('Server started');
});
