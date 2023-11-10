const addInvitationService = async () => Promise.resolve(null);

const addUserService = async () => Promise.resolve(null);

const getServicesByUserId = async () => Promise.resolve(null);

const putSingleServiceIdentifierForUser = async () => Promise.resolve(null);

const getServiceIdentifierDetails = async () => Promise.resolve(null);

const getServicesByInvitationId = async () => Promise.resolve(null);

const getSingleUserService = async () => Promise.resolve(null);

const getSingleInvitationService = async () => Promise.resolve(null);

const listRolesOfService = async () => Promise.resolve(null);

const updateUserService = async () => Promise.resolve(null);

const updateInvitationService = async () => Promise.resolve(null);

const removeServiceFromUser = async (uid, sid, oid, correlationId) => Promise.resolve();

const removeServiceFromInvitation = async (iid, sid, oid, correlationId) => Promise.resolve();

module.exports = {
  addInvitationService,
  getServicesByUserId,
  putSingleServiceIdentifierForUser,
  getServiceIdentifierDetails,
  getServicesByInvitationId,
  getSingleInvitationService,
  getSingleUserService,
  listRolesOfService,
  addUserService,
  updateUserService,
  updateInvitationService,
  removeServiceFromInvitation,
  removeServiceFromUser,
};
