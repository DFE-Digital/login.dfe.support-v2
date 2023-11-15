jest.mock('./../../../src/app/userDevices/utils', () => ({
  search: jest.fn().mockReturnValue({
    criteria: 'test',
    page: 1,
    numberOfPages: 3,
    users: [],
  }),
}));

const get = require('../../../src/app/userDevices/getSearch');

describe('When processing a get to search for user devices', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: 'GET',
      csrfToken: () => 'token',
      accepts: () => ['text/html'],
    };

    res = {
      render: jest.fn(),
    };
  });

  test('then it should render the search view', async () => {
    await get(req, res);

    expect(res.render.mock.calls[0][0]).toBe('userDevices/views/search');
  });

  test('then it should include csrf token', async () => {
    await get(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
      criteria: undefined,
      validationMessages: {},
    });
  });
});
