import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi, Segments } from 'celebrate';

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

routes.get('/items', itemsController.index);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      UF: Joi.string().required().length(2),
      items: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  pointsController.create
);

export default routes;