import logger from '../utils/logger';
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: process.env.KAFKA_BROKERS?.split(','),
});

const consumer = kafka.consumer({ groupId: process.env.HOSTNAME || process.env.KAFKA_GROUP_ID });

export const kafkaConsumer = async () => {
  try {
    let processedRecordCount = 0;
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.CONSUMER__TOPIC, fromBeginning: true });
    await consumer.run({
      eachMessage: async (
        { topic, partition, message }: { topic: string; partition: any; message: any },
      ) => {
        try {
          const RecievedMessage = JSON.parse(message.value);
          logger.debug('kafkaConsumer', `Kafka Recieved Message: ${JSON.stringify(RecievedMessage)}`, message.headers['x-consumer-correlation-id'] ? message.headers['x-consumer-correlation-id'].toString() : "");
          if (topic === process.env.CONSUMER__TOPIC) {
            
          } else {
            logger.warn(`Skipping Kafka Messages from topic ${topic}`, { topic, value: message.value.toString() });
          }
        } catch (error: unknown?) {
          logger.error('error in consumer.run', error.stack || error);
        }
      },
    });
  } catch (error: unknown?) {
    logger.error('error in consumer', error.stack || error);
  }
};
kafkaConsumer().catch(async (e) => {
  logger.error('kafkaConsumer:', `Error: ${e}`);
  consumer && (await consumer.disconnect());
  process.exit(1);
});
