jest.mock('login.dfe.request-promise-retry');
jest.mock('login.dfe.jwt-strategies');
jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory({
  organisations: {
    type: 'api',
    service: {
      url: 'http://organisations.test',
    },
  },
}));

const rp = require('login.dfe.request-promise-retry');

const jwtStrategy = require('login.dfe.jwt-strategies');
const { getServiceIdentifierDetails } = require('../../../src/infrastructure/organisations/api');

const serviceId = 'service-1';
const identifierKey = 'k2s-id';
const identifierValue = '1234567';
const correlationId = 'abc123';
const apiResponse = {
  userId: 'user-1',
  serviceId: 'service-1',
  organisationId: 'organisation-1',
  key: 'k2s-id',
  value: '1234567',
};

describe('when getting a users organisations mapping from api', () => {
  beforeEach(() => {
    rp.mockReset();
    rp.mockImplementation(() => apiResponse);

    jwtStrategy.mockReset();
    jwtStrategy.mockImplementation(() => ({
      getBearerToken: jest.fn().mockReturnValue('token'),
    }));
  });

  it('then it should call service identifiers resource with service id, identifier key and value', async () => {
    await getServiceIdentifierDetails(serviceId, identifierKey, identifierValue, correlationId);

    expect(rp.mock.calls).toHaveLength(1);
    expect(rp.mock.calls[0][0]).toMatchObject({
      method: 'GET',
      uri: 'http://organisations.test/services/service-1/identifiers/k2s-id/1234567',
    });
  });

  it('then it should use the token from jwt strategy as bearer token', async () => {
    await getServiceIdentifierDetails(serviceId, identifierKey, identifierValue, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      headers: {
        authorization: 'bearer token',
      },
    });
  });

  it('then it should include the correlation id', async () => {
    await getServiceIdentifierDetails(serviceId, identifierKey, identifierValue, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      headers: {
        'x-correlation-id': correlationId,
      },
    });
  });

  it('then it should return details', async () => {
    const actual = await getServiceIdentifierDetails(serviceId, identifierKey, identifierValue, correlationId);

    expect(actual).not.toBeNull();
    expect(actual).toMatchObject({
      userId: 'user-1',
      serviceId: 'service-1',
      organisationId: 'organisation-1',
      key: 'k2s-id',
      value: '1234567',
    });
  });

  it('then it should return null if api returns 404', async () => {
    rp.mockImplementation(() => {
      const error = new Error('not found');
      error.statusCode = 404;
      throw error;
    });

    const actual = await getServiceIdentifierDetails(serviceId, identifierKey, identifierValue, correlationId);

    expect(actual).toBeNull();
  });
});
