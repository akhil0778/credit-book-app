const db = require('../config/db');

const setWebhookUrl = async (req, res) => {
  const { webhookUrl } = req.body;
  const userId = req.user.userId;

  try {
    await db('users')
      .where('id', userId)
      .update({ webhook_url: webhookUrl });

    res.status(200).json({ message: 'Webhook URL saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save webhook URL' });
  }
};

module.exports = { setWebhookUrl };