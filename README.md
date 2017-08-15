# What it's for

Wouldn't be great to be able to A/B test various customer engagement strategies in Hubspot  (eg. lead scoring A vs B, email frequency A versus B, etc...).

Unfortunately Hubspot does not allow you to randomly assign leads to a list.

This tool makes this possible, in real-time, for past and new leads.

Alternatives: checkout [Zapier](https://zapier.com/). It is powerful and easy to use.

# What it does

Hookspot is an open-source service that provides an end-point (ie. webhook) that updates your Hubspot lead profiles with a random number.

Here is how it works:
1. You create a [contact workflow](https://knowledge.hubspot.com/articles/kcs_article/workflows/how-do-i-use-webhooks-with-hubspot-workflows) in Hubspot that calls this webhook when a lead is created.
2. This webhook generates a random number between 1 and 100 based on the Hubspot lead id (aka VID).
3. This webhook updates Hubspot's lead profile with this number.

Then you can create campaigns in Hubspot that uses this random number to A/B test your campaigns.

# How to set this up

1. Deploy this service to a platform like [Heroku](https://www.heroku.com/)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

2. After deploying, go into Settings and click on "Reveal Config Vars". Configure the following environment variables with the following:

```
HUBSPOT_API_KEY=zzz

PROPERTY_NAME=zzz
```

You can find your Hubspot API key under "Integrations" in your Hubspot settings.

The `PROPERTY_NAME` is the Hubspot "internal name" of the contact property you want this service to update.

3. Under Heroku Settings, find your domain. Usually it's https://{APP_NAME}.herokuapp.com/

4. Now go into Hubspot contact workflow and create a new one which has only one step: "trigger a webhook" with `POST` as the `method` and the url above as the `webhook URL` (do not check the use authentication checkbox).

5. Save and activate workflow

You're all set.
