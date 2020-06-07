import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController(),
      itemsController  = new ItemsController();

routes.get('/', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    message: 'Bem-vindo ao Ecoleta!'
  });
});

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', upload.single('image'), pointsController.create);

routes.get('/items', itemsController.index);

export default routes;