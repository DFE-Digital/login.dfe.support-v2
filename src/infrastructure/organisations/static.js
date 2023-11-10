const getUserOrganisations = async (userId) => Promise.resolve([
  {
    id: '83f00ace-f1a0-4338-8784-fa14f5943e5a',
    name: 'Some service',
    description: 'Some service that does some stuff',
    status: 1,
    userId: '7a1b077a-d7d4-4b60-83e8-1a1b49849510',
    requestDate: '2018-01-18T10:46:59.385Z',
    approvers: [],
    organisation: {
      id: '88a1ed39-5a98-43da-b66e-78e564ea72b0',
      name: 'Big School',
    },
    role: {
      id: 0,
      name: 'End user',
    },
  },
]);

const getUserOrganisationsV2 = async (userId) => Promise.resolve([
  {
    id: '83f00ace-f1a0-4338-8784-fa14f5943e5a',
    name: 'Some service',
    description: 'Some service that does some stuff',
    status: 1,
    userId: '7a1b077a-d7d4-4b60-83e8-1a1b49849510',
    requestDate: '2018-01-18T10:46:59.385Z',
    approvers: [],
    organisation: {
      id: '88a1ed39-5a98-43da-b66e-78e564ea72b0',
      name: 'Big School',
    },
    role: {
      id: 0,
      name: 'End user',
    },
  },
]);

const getInvitationOrganisations = async (invitationId, correlationId) => Promise.resolve([
  {
    invitationId,
    role: {
      id: 0,
      name: 'End user',
    },
    service: {
      id: '3bfde961-f061-4786-b618-618deaf96e44',
      name: 'Key to success (KtS)',
    },
    organisation: {
      id: '88a1ed39-5a98-43da-b66e-78e564ea72b0',
      name: 'Big School',
    },
    role: {
      id: 0,
      name: 'End user',
    },
  },
]);

const getServiceById = async (serviceId, correlationId) => Promise.resolve({
  id: '83f00ace-f1a0-4338-8784-fa14f5943e5a',
  name: 'Some service',
  description: 'Some service that does some stuff',
});

const getPageOfOrganisations = async (pageNumber) => Promise.resolve({
  organisations: [
    {
      id: '83f00ace-f1a0-4338-8784-fa14f5943e5a',
      name: 'Some service',
    },
  ],
  page: pageNumber,
  totalNumberOfPages: 1,
});

const getAllOrganisations = async () => (await getPageOfOrganisations(1)).organisations;

const getAllServices = async () => Promise.resolve([{
  id: '83f00ace-f1a0-4338-8784-fa14f5943e5a',
  name: 'Some service',
  description: 'Some service that does some stuff',
}]);

const getOrganisationById = async (id) => (await getPageOfOrganisations(1)).organisations.find((x) => x.id === id);

const getOrganisationByIdV2 = async (id) => (await getPageOfOrganisations(1)).organisations.find((x) => x.id === id);

const getServiceIdentifierDetails = async () => Promise.resolve(null);

const addInvitationService = async () => Promise.resolve(null);

const addInvitationOrganisation = async () => Promise.resolve(null);

const getServicesByUserId = async () => Promise.resolve(null);

const putSingleServiceIdentifierForUser = async () => Promise.resolve(null);

const searchOrganisations = async (criteria, pageNumber, correlationId) => getPageOfOrganisations(pageNumber, correlationId);

const setUserAccessToOrganisation = async (userId, organisationId, roleId, correlationId) => Promise.resolve(null);

const getOrganisationCategories = async (correlationId) => Promise.resolve([]);

const getOrganisationUsersForApproval = async (pageNumber, correlationId) => Promise.resolve([]);

const listUserServices = async (page, pageSize, correlationId) => Promise.resolve([]);

const listInvitationServices = async (page, pageSize, correlationId) => Promise.resolve([]);

const getAllRequestsForSupport = async (correlationId) => Promise.resolve();

const getRequestById = async (requestId, correlationId) => Promise.resolve();

const updateRequestById = async (requestId, status, actionedBy, actionedReason, actionedAt, correlationId) => Promise.resolve();

const putUserInOrganisation = async (userId, orgId, status, role, reason, correlationId) => Promise.resolve();

const getPendingRequestsAssociatedWithUser = async (userId, correlationId) => Promise.resolve();

const getCategories = async (id) => (await getCategories());

module.exports = {
  getUserOrganisations,
  getInvitationOrganisations,
  getServiceById,
  getPageOfOrganisations,
  getAllOrganisations,
  getAllServices,
  getOrganisationById,
  getOrganisationByIdV2,
  getServiceIdentifierDetails,
  addInvitationService,
  addInvitationOrganisation,
  getServicesByUserId,
  putSingleServiceIdentifierForUser,
  searchOrganisations,
  setUserAccessToOrganisation,
  getOrganisationCategories,
  getOrganisationUsersForApproval,
  listUserServices,
  listInvitationServices,
  getUserOrganisationsV2,
  getAllRequestsForSupport,
  getRequestById,
  updateRequestById,
  putUserInOrganisation,
  getPendingRequestsAssociatedWithUser,
  getCategories,
};
