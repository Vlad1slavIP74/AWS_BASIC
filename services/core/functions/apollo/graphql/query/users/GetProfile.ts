import GetProfile from '../../domainModel/users/GetProfile';

async function getProfile(_, args, context) {

  const getProfileHelper = new GetProfile(args);
  return await getProfileHelper.getUserProfile();
}

export {
    getProfile,
};
