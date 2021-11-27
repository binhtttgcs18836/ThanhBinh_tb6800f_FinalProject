import Orders from '../../../../models/orderMl';
import connectDB from '../../../../utils/connectDB';
import auth from '../../../../middleware/auth';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      await deliveredOrder(req, res);
      break;
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin')
      return res.status(400).json({ err: 'Authentication is not valid.' });
    const { id } = req.query;

    const order = await Orders.findOne({ _id: id });
    
    if (order.pay) {
      await Orders.findOneAndUpdate({ _id: id }, { delivered: true });

      res.json({
        msg: 'Updated success!',
        result: {
          pay: true,
          dateOfPayment: order.dateOfPayment,
          method: order.method,
          delivered: true,
        },
      });
    } else {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          pay: true,
          dateOfPayment: new Date().toISOString(),
          method: 'Receive Cash',
          delivered: true,
        }
      );

      res.json({
        msg: 'Updated success!',
        result: {
          pay: true,
          dateOfPayment: new Date().toISOString(),
          method: 'Receive Cash',
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
