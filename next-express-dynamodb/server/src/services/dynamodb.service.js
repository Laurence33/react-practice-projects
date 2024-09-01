const {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  GetItemCommand,
  BatchWriteItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  QueryCommand,
} = require('@aws-sdk/client-dynamodb');
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');

class DynamoDBService {
  constructor() {
    if (!this.client)
      this.client = new DynamoDBClient({ region: 'ap-southeast-1' });
  }

  async scan(tableName, exclusiveStartKey) {
    const command = new ScanCommand({
      TableName: tableName,
      ReturnConsumedCapacity: 'TOTAL',
      // Limit: 5,
      ExclusiveStartKey: exclusiveStartKey,
    });
    const response = await this.client.send(command);
    console.log(response.ConsumedCapacity);
    const items = response.Items.map((item) => unmarshall(item));
    return { items, lastEvaluatedKey: response.LastEvaluatedKey };
  }

  async query(tableName, query, exclusiveStartKey) {
    const {
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    } = this.#mapQuery(query);
    const command = new QueryCommand({
      TableName: tableName,
      ReturnConsumedCapacity: 'TOTAL',
      ExclusiveStartKey: exclusiveStartKey,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    });
    const response = await this.client.send(command);
    console.log(response.ConsumedCapacity);
    const items = response.Items.map((item) => unmarshall(item));
    return { items, lastEvaluatedKey: response.LastEvaluatedKey };
  }

  async putItem(tableName, item) {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: marshall(item),
    });
    await this.client.send(command);
    return;
  }

  async batchPutItem(tableName, items) {
    const command = new BatchWriteItemCommand({
      RequestItems: {
        [tableName]: items.map((item) => ({
          PutRequest: { Item: marshall(item) },
        })),
      },
      ReturnConsumedCapacity: 'TOTAL',
    });
    const response = await this.client.send(command);
    console.log(response.ConsumedCapacity);
    return;
  }

  async getItem(tableName, key) {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: marshall(key),
    });
    const response = await this.client.send(command);
    if (response.Item) {
      return unmarshall(response.Item);
    }
    return null;
  }

  async updateItem(tableName, Key, newValues) {
    const {
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    } = this.#mapUpdateQuery(newValues);

    const command = new UpdateItemCommand({
      TableName: tableName,
      Key: marshall(Key),
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });
    const response = await this.client.send(command);
    if (response.Attributes) {
      return unmarshall(response.Attributes);
    }
    return null;
  }
  #mapExpressionAttributes(query) {
    const queryKeys = Object.keys(query);
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    queryKeys.forEach((key) => {
      ExpressionAttributeNames[`#${key}_key`] = key;
      ExpressionAttributeValues[`:${key}_val`] = marshall(query[key]);
    });
    return {
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    };
  }
  #mapUpdateQuery(query) {
    const queryKeys = Object.keys(query);
    const UpdateExpression =
      'SET ' + queryKeys.map((key) => `#${key}_key = :${key}_val`).join(', ');
    return {
      UpdateExpression,
      ...this.#mapExpressionAttributes(query),
    };
  }

  #mapQuery(query) {
    const queryKeys = Object.keys(query);

    const KeyConditionExpression = queryKeys
      .map((key) => `#${key}_key = :${key}_val`)
      .join(' AND ');

    return {
      KeyConditionExpression,
      ...this.#mapExpressionAttributes(query),
    };
  }

  async deleteItem(tableName, key) {
    const command = new DeleteItemCommand({
      TableName: tableName,
      Key: marshall(key),
      ReturnValues: 'ALL_OLD',
    });
    const response = await this.client.send(command);
    if (response.Attributes) {
      return unmarshall(response.Attributes);
    }
    return null;
  }
}

module.exports = { DynamoDBService };
