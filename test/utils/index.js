const loggerMockFactory = () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  audit: jest.fn(),
});

const configMockFactory = (customConfig) => ({
  hostingEnvironment: {
    env: 'test-run',
  },

  cache: {
    type: 'static',
  },
  directories: {
    type: 'static',
  },
  organisations: {
    type: 'static',
  },
  serviceMapping: {
    type: 'static',
  },
  audit: {
    type: 'static',
  },
  devices: {
    type: 'static',
  },
  applications: {
    type: 'static',
  },
  redis: {
    url: 'http://orgs.api.test',
  },
  notifications: {
    connectionString: '',
  },
  access: {
    type: 'static',
  },
  loggerSettings: {},
  toggles: {},
  ...customConfig,
});

const getRequestMock = (customRequest = {}) => ({
  id: 'correlationId',
  csrfToken: jest.fn().mockReturnValue('token'),
  accepts: jest.fn().mockReturnValue(['text/html']),
  params: {},
  body: {},
  query: {},
  user: {
    sub: 'suser1',
    email: 'super.user@unit.test',
  },
  session: {},
  ...customRequest,
});

const getResponseMock = () => {
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    status: jest.fn(),
    contentType: jest.fn(),
    send: jest.fn(),
    flash: jest.fn(),
    mockResetAll() {
      this.render.mockReturnValue(res);
      this.redirect.mockReturnValue(res);
      this.status.mockReturnValue(res);
      this.contentType.mockReturnValue(res);
    },
  };

  res.mockResetAll();
  return res;
};

module.exports = {
  loggerMockFactory,
  configMockFactory,
  getRequestMock,
  getResponseMock,
};
