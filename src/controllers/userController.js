import User from '../models/user.js'; 

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      const message = userExists.username === username ? 'Usuário já existe' : 'Email já existe';
      return res.status(400).json({ message });
    }

    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(400).json({ message: 'Dados de usuário inválidos' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await user.matchPassword(password);

      if (isPasswordMatch) {
        const token = generateToken(user._id);

        return res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token,
        });
      }
    }
    
    return res.status(401).json({ message: 'Credenciais inválidas' });

  } catch (error) {
    console.log('Erro ao logar:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
