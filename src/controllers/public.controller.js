import ItemModel from '../models/Item.model';
import dotenv from 'dotenv';

dotenv.config();

const { APIKEY } = process.env;

export const createItem = async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === APIKEY) {
    try {
      const newItem = await new ItemModel({
        name: req.body.name,
        codeId: req.body.codeId,
        type: req.body.type,
        inputs: req.body.inputs,
        values: req.body.values,
        result: req.body.result,
        date: req.body.date,
      }).save();
      if (newItem) {
        return res.status(201).json({
          status: "success",
          message: "Item created successfully",
          data: newItem._id,
        });
      };
      return res.status(400).json({
        status: "error",
        message: "Item not created",
        data: null,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        data: err,
      });
    };
  } else {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  };
};

export const readItemById = async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === APIKEY) {
    try {
      const { itemId } = req.params;
      if (itemId) {
        const item = await ItemModel.findById(itemId);
        if (item) {
          return res.json({
            status: 'success',
            message: 'Item found',
            data: {
              name: item.name,
              codeId: item.codeId,
              type: item.type,
              inputs: item.inputs,
              values: item.values,
              result: item.result,
              date: item.date
            },
          });
        };
        return res.status(404).json({
          status: 'error',
          message: 'Item not found',
          data: null,
        });
      };
      return res.status(400).json({
        status: 'error',
        message: 'Item id is required',
        data: null,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: err,
      });
    };
  } else {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  };
};

export const countItemsDb = async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === APIKEY) {
    try {
      const count = await ItemModel.countDocuments();
      if (count > 0) {
        return res.json({
          status: 'success',
          message: 'Counted items',
          data: count,
        });
      }
      return res.status(400).json({
        status: 'error',
        message: 'Items not counted',
        data: null,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while counting the items',
        data: err,
      });
    };
  } else {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
      data: null,
    });
  };
};
