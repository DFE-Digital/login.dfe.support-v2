const getDevices = async (correlationId) => Promise.resolve([
  { serialNumber: '123-456-789' },
  { serialNumber: '234-567-890' },
]);

const deviceExists = async (serialNumber, correlationId) => Promise.resolve(false);

const syncDigipassToken = async (serialNumber, code1, code2) => Promise.resolve(true);

const deactivateToken = async () => Promise.resolve(true);

module.exports = {
  getDevices,
  deviceExists,
  syncDigipassToken,
};
