import User, { deleteUserById } from '../../models/user';

export const getUserList = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const [user, count] = await Promise.all([User.aggregate([{ $limit: limit }, { $skip: skip }]), User.count()]);
    res.success(user, { count: +count, limit, skip });
  } catch (error) {
    res.fail(error.stack);
  }
};

export const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndUpdate({ username }, { $set: req.body }, {new: true, upsert: true});
    res.success(user);
  } catch (error) {
    const message = error.code === 11000 ? 'Username is taken.' : message.message;
    res.fail(message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.updateOne({ _id: id }, { $set: req.body });
    res.success('Updated Successfully.');
  } catch (error) {
    res.fail(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    res.success(result);
  } catch (error) {
    res.fail(error);
  }
};
