import { Request, Response } from 'express';
import connection from '../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    try {
      const items = await connection('items')
        .select('*');

      const serializedItems = items.map(item => {
        return {
		  id: item.id,
          title: item.title,
          image_url: `http://localhost:3333/uploads/${item.image}`
        };
      });

      return res.status(200).json({
        status: 'QUERY_OK',
        message: '',
        error: [],
        data: serializedItems
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

export default ItemsController;