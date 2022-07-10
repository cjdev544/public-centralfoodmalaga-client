import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_PRIVATE_KEY,
  server: process.env.MAILCHIMP_SERVER,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body

  try {
    await mailchimp.lists.addListMember('b0c26c4572', {
      email_address: email,
      status: 'subscribed',
    })

    return res.status(201).json({
      ok: true,
      res: 'Usuario subscrito',
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
    })
  }
}
