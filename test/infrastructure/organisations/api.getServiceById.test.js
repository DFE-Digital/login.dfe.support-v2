jest.mock('login.dfe.request-promise-retry');
jest.mock('agentkeepalive', () => ({
  HttpsAgent: jest.fn(),
}));
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
const { getServiceById } = require('../../../src/infrastructure/organisations/api');

const serviceId = 'service-1';
const correlationId = 'abc123';
const apiResponse = {
  users: [],
  numberOfPages: 1,
};

describe('when getting a service by id from api', () => {
  beforeEach(() => {
    rp.mockReset();
    rp.mockImplementation(() => apiResponse);

    jwtStrategy.mockReset();
    jwtStrategy.mockImplementation(() => ({
      getBearerToken: jest.fn().mockReturnValue('token'),
    }));
  });

  it('then it should call services resource with service id', async () => {
    await getServiceById(serviceId, correlationId);

    expect(rp.mock.calls).toHaveLength(1);
    expect(rp.mock.calls[0][0]).toMatchObject({
      method: 'GET',
      uri: 'http://organisations.test/services/service-1',
    });
  });

  it('then it should use the token from jwt strategy as bearer token', async () => {
    await getServiceById(serviceId, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      headers: {
        authorization: 'bearer token',
      },
    });
  });

  it('then it should include the correlation id', async () => {
    await getServiceById(serviceId, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      headers: {
        'x-correlation-id': correlationId,
      },
    });
  });
});
