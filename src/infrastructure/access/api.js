const rp = require('login.dfe.request-promise-retry');
const jwtStrategy = require('login.dfe.jwt-strategies');
const config = require('../config');

const addInvitationService = async (invitationId, serviceId, organisationId, externalIdentifiers = [], roles = [], correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();

  try {
    return await rp({
      method: 'PUT',
      uri: `${config.access.service.url}/invitations/${invitationId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: {
        identifiers: externalIdentifiers,
        roles,
      },
      json: true,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 403) {
      return false;
    }
    if (status === 409) {
      return false;
    }
    throw e;
  }
};

const addUserService = async (userId, serviceId, organisationId, roles = [], correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();

  try {
    return await rp({
      method: 'PUT',
      uri: `${config.access.service.url}/users/${userId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: {
        roles,
      },
      json: true,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 403) {
      return false;
    }
    if (status === 409) {
      return false;
    }
    throw e;
  }
};

const updateUserService = async (userId, serviceId, organisationId, roles, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'PATCH',
      uri: `${config.access.service.url}/users/${userId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: {
        roles,
      },
      json: true,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 403) {
      return false;
    }
    if (status === 409) {
      return false;
    }
    throw e;
  }
};

const updateInvitationService = async (invitationId, serviceId, organisationId, roles, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();

  try {
    return await rp({
      method: 'PATCH',
      uri: `${config.access.service.url}/invitations/${invitationId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: {
        roles,
      },
      json: true,
    });
  } catch (e) {
    const status = e.statusCode ? e.statusCode : 500;
    if (status === 403) {
      return false;
    }
    if (status === 409) {
      return false;
    }
    throw e;
  }
};

const getServicesByUserId = async (id, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();

  try {
    return await rp({
      method: 'GET',
      uri: `${config.access.service.url}/users/${id}/services`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const getServicesByInvitationId = async (iid, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'GET',
      uri: `${config.access.service.url}/invitations/${iid}/services`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const putSingleServiceIdentifierForUser = async (userId, serviceId, orgId, key, value, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    await rp({
      method: 'PUT',
      uri: `${config.access.service.url}/users/${userId}/services/${serviceId}/organisations/${orgId}/identifiers/${key}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      body: {
        value,
      },
      json: true,
    });
    return true;
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    if (e.statusCode === 409) {
      return undefined;
    }
    throw e;
  }
};

const getServiceIdentifierDetails = async (serviceId, identifierKey, identifierValue, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'GET',
      uri: `${config.access.service.url}/services/${serviceId}/users?filteridkey=${identifierKey}&filteridvalue=${identifierValue}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const getSingleUserService = async (userId, serviceId, organisationId, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'GET',
      uri: `${config.access.service.url}/users/${userId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const getSingleInvitationService = async (invitationId, serviceId, organisationId, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'GET',
      uri: `${config.access.service.url}/invitations/${invitationId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const listRolesOfService = async (serviceId, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'GET',
      uri: `${config.access.service.url}/services/${serviceId}/roles`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    if (e.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
};

const removeServiceFromUser = async (userId, serviceId, organisationId, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'DELETE',
      uri: `${config.access.service.url}/users/${userId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    throw e;
  }
};

const removeServiceFromInvitation = async (invitationId, serviceId, organisationId, correlationId) => {
  const token = await jwtStrategy(config.access.service).getBearerToken();
  try {
    return await rp({
      method: 'DELETE',
      uri: `${config.access.service.url}/invitations/${invitationId}/services/${serviceId}/organisations/${organisationId}`,
      headers: {
        authorization: `bearer ${token}`,
        'x-correlation-id': correlationId,
      },
      json: true,
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addInvitationService,
  getServicesByUserId,
  getServicesByInvitationId,
  putSingleServiceIdentifierForUser,
  getServiceIdentifierDetails,
  getSingleUserService,
  getSingleInvitationService,
  listRolesOfService,
  addUserService,
  updateInvitationService,
  updateUserService,
  removeServiceFromUser,
  removeServiceFromInvitation,
};
