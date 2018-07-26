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
    const { username, channelId } = req.body;
    const check = await User.findOne({ username, channelId, socketId: { $ne: null } });
    if (check) return res.fail('Username is already taken!', 500);
    const user = await User.findOneAndUpdate(
      { username, channelId: null, socketId: null },
      { $set: req.body },
      { upsert: true, new: true }
    );
    //const user = await User.create(req.body);
    return res.success(user);
  } catch (error) {
    console.log(error.stack);
    return res.fail('create user error.');
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
