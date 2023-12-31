jest.mock('login.dfe.request-promise-retry');
jest.mock('login.dfe.jwt-strategies');
jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory({
  directories: {
    type: 'api',
    service: {
      url: 'http://directories.test',
    },
  },
}));

const rp = require('login.dfe.request-promise-retry');

const jwtStrategy = require('login.dfe.jwt-strategies');
const { createChangeEmailCode } = require('../../../src/infrastructure/directories/api');

const correlationId = 'abc123';
const userId = 'user1';
const newEmailAddress = 'user.one@unit.tests';
const clientId = 'client1';
const redirectUri = 'http://client.one';
const apiResponse = [
  {
    code: 'ABC123',
  },
];

describe('when creating a change email code in the directories api', () => {
  beforeEach(() => {
    rp.mockReset();
    rp.mockImplementation(() => apiResponse);

    jwtStrategy.mockReset();
    jwtStrategy.mockImplementation(() => ({
      getBearerToken: jest.fn().mockReturnValue('token'),
    }));
  });

  it('then it should call user codes resource with uid', async () => {
    await createChangeEmailCode(userId, newEmailAddress, clientId, redirectUri, correlationId);

    expect(rp.mock.calls).toHaveLength(1);
    expect(rp.mock.calls[0][0]).toMatchObject({
      method: 'PUT',
      uri: 'http://directories.test/usercodes/upsert',
    });
  });

  it('then it should use the token from jwt strategy as bearer token', async () => {
    await createChangeEmailCode(userId, newEmailAddress, clientId, redirectUri, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      headers: {
        authorization: 'bearer token',
      },
    });
  });

  it('then it should include the correlation id', async () => {
    await createChangeEmailCode(userId, newEmailAddress, clientId, redirectUri, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      headers: {
        'x-correlation-id': correlationId,
      },
    });
  });

  it('then it will include userid, code type, email address, client id and redirect uri in the body', async () => {
    await createChangeEmailCode(userId, newEmailAddress, clientId, redirectUri, correlationId);

    expect(rp.mock.calls[0][0]).toMatchObject({
      body: {
        uid: userId,
        clientId,
        redirectUri,
        codeType: 'changeemail',
        email: newEmailAddress,
        selfInvoked: false,
      },
    });
  });
});
