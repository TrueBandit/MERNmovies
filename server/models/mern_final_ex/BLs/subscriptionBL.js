const Subscription = require('../data_models/subscriptionModel');

const getAllSubscriptions = async () => {
  let resp = await Subscription.find({})
    return resp;
};

const addSubscription = async (obj) => {
  sub = new Subscription(obj);
    await sub.save();
    return sub._id;
};

module.exports = {
    getAllSubscriptions,
    addSubscription
  };
