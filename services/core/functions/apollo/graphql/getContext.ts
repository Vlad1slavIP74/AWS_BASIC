import { User } from '../../../../infrastructure/rds/src/aws/src/entity/User';
import { Database } from '../../../../infrastructure/rds/src/aws/src/DbConnection';
// import {getRepository, Connection } from "typeorm"
import jwtDecode from 'jwt-decode';

async function _getProfile(userId) {
  const database = new Database();

  await database.getConnection();

  // const userRep = await dbConn.getRepository(User)

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  return {
    userId,
    firstName: user['first_name'],
    lastName: user['last_name'],
    email: user.email,
    role: user.role,
  };
}

export default async function getContext(value) {
  const { event, context } = value;
  const connection = {};

  if (process.env.LAMBDA) {
    const decode:any = jwt_decode(event.headers['x-api-key']);
    const userData = await _getProfile(decode.sub);

    return {
      connection,
      event,
      context,
      ...userData,
    };
  }
  // only for local use
  const decode:any = jwt_decode(value.req.headers['x-api-key']);
  const userData = await _getProfile(decode.sub);
  return {
    event,
    connection,
    context,
    ...userData,
  };
}
