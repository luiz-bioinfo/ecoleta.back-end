import { Request, Response } from 'express';
import connection from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    try {
      const {
        city,
        UF,
        items
      } = req.query;

      const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

      const points = await connection('points')
        .join('point_items', 'point_items.point', '=', 'points.id')
        .whereIn('point_items.item', parsedItems)
        .where({ city: String(city) })
        .where({ uf: String(UF) })
        .distinct()
        .select('points.*');

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `http://10.0.0.109:3333/uploads/${point.image}`
        }
      });

      return res.status(200).json({
        status: 'QUERY_OK',
        message: '',
        error: [],
        data: serializedPoints
      });
    } catch (error) {
      return res.status(500).json({
        status: 'QUERY_ERROR',
        message: '',
        error,
        data: []
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const point = await connection('points')
        .where({ id })
        .first();

      if (point) {
        const serializedPoint = {
            ...point,
            image_url: `http://10.0.0.109:3333/uploads/${point.image}`
          };

        const items = await connection('items')
          .join('point_items', 'items.id', '=', 'point_items.item')
          .where({ 'point_items.point': id })
          .select('items.title');
        
        return res.status(200).json({
          status: 'QUERY_OK',
          message: '',
          error: [],
          data: {...serializedPoint, items}
        });
      }
      else
        return res.status(500).json({
          status: 'NOT_FOUND_ERROR',
          message: '',
          error: [],
          data: []
        });
    } catch (error) {
      return res.status(500).json({
        status: 'QUERY_ERROR',
        message: '',
        error,
        data: []
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        UF,
        items
      } = req.body;
  
      await connection.transaction(async trx => {
        const insertion = await trx('points').insert({
          name,
          image: req.file.filename,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          UF
        });
  
        const pointItems = items
          .split(',')
          .map((item: string) => Number(item.trim()))
          .map((id: Number) => {
            return {
              item: id,
              point: insertion
            }
          });
  
        await trx('point_items').insert(pointItems);
  
        return res.status(200).json({
          status: 'QUERY_OK',
          message: '',
          error: [],
          data: { id: insertion[0] }
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 'QUERY_ERROR',
        message: '',
        error,
        data: []
      });
    }
  }
};

export default PointsController;