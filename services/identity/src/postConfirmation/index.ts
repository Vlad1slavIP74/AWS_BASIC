import awsSdk from 'aws-sdk';
import { EntityManager } from 'typeorm';

import { User } from '../../../infrastructure/rds/src/aws/src/entity/User';
import init from '../../../infrastructure/rds/src/aws/src/init';

const {
  REGION,
  USER_POOL_ID,
} = process.env;

interface USER_INFO  {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

awsSdk.config.update({ region: REGION });
const cognitoidentityserviceprovider = new awsSdk.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

async function updateCognitoRole(email:string, role: string): Promise<string> {
  const paramsCognito = {
    UserAttributes: [{
      Name: 'custom:role',
      Value: role,
    }],
    UserPoolId: USER_POOL_ID,
    Username: email,
  };

  try {
    await cognitoidentityserviceprovider
      .adminUpdateUserAttributes(paramsCognito)
      .promise();
    return 'update cognito role OK';
  } catch (error) {
    return error;
  }
}

async function createUser(userParams:USER_INFO, transactionalEntityManager: EntityManager) {
  const {
    role, email, firstName, lastName,
    id,
  } = userParams;
  const user = new User();

  user.role = role;
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.id = id;
  const UserRepository = await transactionalEntityManager.getRepository<User>(User);

  await UserRepository.save(user);

}

exports.handler = async (event, context) => {
  const connection = await init();

  const userInfo = event.request.userAttributes;
  const {
     sub: userCognitoId,
  } = userInfo;

  const { 'custom:role': role,
  'custom:firstName': firstName,
  'custom:lastName': lastName,
   email } = userInfo;

  const userParams: USER_INFO = {
    role, firstName, lastName, email, id: userCognitoId,
  };

  try {
    await connection.transaction(async transactionalEntityManager => {
      await createUser(userParams, transactionalEntityManager);

    });
  } catch (error) {
    throw error;
  } finally {
    await connection.close();

  }

  return  context.succeed(event);

};
