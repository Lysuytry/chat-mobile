import Channel from '../../models/channel';

export const createChannel = async (req, res) => {
  try {
    const { name, limit } = req.body;
    const channel = new Channel({ name, limit });
    const result = await channel.save();
    res.success(result);
  } catch (error) {
    res.fail(error.message);
  }
};

export const getChannelList = async (req, res) => {
  try {
    const { limit, skip, status } = req.query;

    const condition = { status };

    const [channels, total] = await Promise.all([
      Channel.find(condition)
        .skip(skip)
        .limit(limit),
      Channel.count(condition)
    ]);
    res.success(channels, { limit, skip, total });
  } catch (error) {
    res.fail(error.message);
  }
};

export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const channel = await Channel.findOne({ _id: id, status });
    res.success(channel);
  } catch (error) {
    res.fail(error.message);
  }
};

export const updateChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const data = req.body;
    const conditions = [{ _id: id, status }, { $set: data }];
    await Channel.updateOne(...conditions);
    res.success('Successfully Updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

export const deleteChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = [{ _id: id, status: 'active' }, { $set: { status: 'inactive' } }];
    const result = await Channel.updateOne(...conditions);
    console.log(result);
    res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};
