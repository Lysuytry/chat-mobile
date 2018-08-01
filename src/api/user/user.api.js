import User, { deleteUserById } from '../../models/user';
const { DBNAME } = process.env;
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
    const user = await User.create(req.body);
    res.success(user);
  } catch (error) {
    let message; // = error.code === 11000 ? 'Username or Email is taken.' : error.message;
    if (error.code === 11000) {
      message =
        Object.values(error.message).indexOf(`E11000 duplicate key error index: ${DBNAME}.users.$email_1 dup key: `) > -1 ? 'Email is taken.' : 'Username is taken.';
    } else {
      message = error.message;
    }
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
