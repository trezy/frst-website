require('isomorphic-fetch')

const cors = require('cors')({ origin: true })
const functions = require('firebase-functions')





exports.addSubscriber = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    const {
      mailchimp_api_key,
      mailchimp_api_server,
      mailchimp_list_id,
    } = functions.config().frst

    try {
      const response = await fetch(`https://${mailchimp_api_server}.api.mailchimp.com/3.0/lists/${mailchimp_list_id}/members`, {
        body: JSON.stringify(req.body),
        headers: {
          Authorization: `Basic ${Buffer.from(`apikey:${mailchimp_api_key}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        method: 'post',
      })
      res.status(response.status)

      if (response.ok) {
        res.send()
      } else {
        res.send(await response.json())
      }
    } catch (error) {
      res.status(400)
      res.send(error)
    }
  })
})
