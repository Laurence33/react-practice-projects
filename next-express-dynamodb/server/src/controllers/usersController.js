const { DynamoDBService } = require('../services/dynamodb.service');
const USERS_TABLE = 'users';
const scanUsers = async (req, res) => {
  const { exclusiveStartKey } = req.body;
  const dynamoDB = new DynamoDBService();
  const { items: users, lastEvaluatedKey } = await dynamoDB.scan(
    USERS_TABLE,
    exclusiveStartKey
  );
  return res.json({ users, lastEvaluatedKey });
};

const queryUsers = async (req, res) => {
  const { exclusiveStartKey, query } = req.body;
  const dynamoDB = new DynamoDBService();
  const { items: users, lastEvaluatedKey } = await dynamoDB.query(
    USERS_TABLE,
    query,
    exclusiveStartKey
  );
  return res.json({ users, lastEvaluatedKey });
};
const addUser = async (req, res) => {
  const dynamoDB = new DynamoDBService();
  const user = await dynamoDB.putItem(USERS_TABLE, req.body);
  return res.json(user);
};

const batchAddUser = async (req, res) => {
  const dynamoDB = new DynamoDBService();
  const users = await dynamoDB.batchPutItem(USERS_TABLE, req.body);
  return res.json(users);
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const dynamoDB = new DynamoDBService();
  const user = await dynamoDB.getItem(USERS_TABLE, { id: userId });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user);
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const dynamoDB = new DynamoDBService();
  const Key = { id: userId };
  const user = await dynamoDB.updateItem(USERS_TABLE, Key, req.body);
  return res.json(user);
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const dynamoDB = new DynamoDBService();
  const user = await dynamoDB.deleteItem(USERS_TABLE, { id: userId });
  return res.json(user);
};

module.exports = {
  scanUsers,
  addUser,
  getUserById,
  batchAddUser,
  updateUser,
  deleteUser,
  queryUsers,
};
