import { SQSHandler, SQSMessageAttributes } from 'aws-lambda';

export const receiver: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      console.log('Message Attributtes -->  ', messageAttributes.AttributeNameHere.stringValue);
      console.log('Message Body -->  ', record.body);
      // Do something
    }
  } catch (error) {
    console.log(error);
  }
};
