import { User } from '../../../../../../infrastructure/rds/src/aws/src/entity/User';
import { UserTypes } from '../../types/index';
import { GetProfileDTO } from '../../dto/users/GetProfile.dto';
import  ValidationError  from '../../errors/ValidationError';

export default class GetProfile {
  params:UserTypes.GetProfile;
  constructor(args) {
      this.params = args;
    }

  async getUserProfile() {
      const { id } = this.params;
      const user: GetProfileDTO | undefined = await User.findById(id);

      if (!user) {
          throw new ValidationError({ fields: {}, errorMessage: 'USER_NOT_EXIST' });
        }

      return user;
    }

}
