const { unlockToken } = require('./utils');
const { sendResult } = require('../../infrastructure/utils');

const action = async (req, res) => {
  const unlockTokenResult = await unlockToken(req);

  if (unlockTokenResult.success) {
    sendResult(req, res, 'userDevices/views/unlockTokenCode', {
      csrfToken: req.csrfToken(),
      unlockCode: unlockTokenResult.unlockCode,
      serialNumber: req.body.serialNumber,
      backLink: `/userdevices/${req.body.serialNumber}`,
    });
  } else if (unlockTokenResult.redirectToDeactivate) {
    res.redirect(`/userDevices/${req.body.serialNumber}/deactivate/${req.body.uid}`);
  } else {
    sendResult(req, res, 'userDevices/views/unlockToken', {
      csrfToken: req.csrfToken(),
      validationMessages: unlockTokenResult.validationResult.messages,
      serialNumber: req.body.serialNumber,
      backLink: `/userdevices/${req.body.serialNumber}`,
    });
  }
};

module.exports = action;
