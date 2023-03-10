import OrderModel from "../models/Order.js";

export const createOrder = async (req, res) => {
  let { email, order_data, order_date, order_time } = req.body;

  await order_data.splice(0, 0, { order_date: order_date, order_time: order_time });

  // email not resides in DB
  let findEmail = await OrderModel.findOne({ email: email })


  if (findEmail === null) {
    try {
      const newOrder = await OrderModel.create({ email: email, order_data: [order_data] })
      // console.log(newOrder)
      if (newOrder) res.status(200).json({ success: true })
    } catch (error) {
      // console.log(error.message);
      res.status(500).send({ error: error.message })
    }
  }

  else {
    try {
      await OrderModel.findOneAndUpdate(
        { email: email },
        { $push: { order_data: order_data } }
      ).then(() => {
        res.status(200).json({ success: true })
      });
    } catch (error) {
      res.status(500).send('server error: ', error.message)
    }
  }
}



export const getOrders = async (req, res) => {
  try {
    // let { email } = req.body
    // console.log(email);

    let userOrders = await OrderModel.findOne({ email: req.body.email });
    // let copy = [...userOrders.order_data]
    // console.log(copy);
    res.status(200).send({ orderData: userOrders });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}