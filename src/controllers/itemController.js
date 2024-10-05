import Item from '../models/item.js'; // Certifique-se de usar a extensão .js

export const createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const item = await Item.create({
      name,
      description,
      price,
      user: req.user._id,
    });
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Dados do item inválidos' });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    return res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, description, price },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    return res.json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Dados do item inválidos' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    return res.json({ message: 'Item removido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
