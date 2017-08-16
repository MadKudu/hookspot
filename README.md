# Hookspot

## What it's for

Wouldn't it be great to A/B test various customer engagement strategies in Hubspot? (eg. impact of lead scoring A vs B, best email frequency, etc...).

Unfortunately Hubspot does not allow you to randomly assign leads to a list.

This tool makes this possible, in real-time, for past and new leads.

Alternatives: checkout [Zapier](https://zapier.com/). It is powerful and easy to use.

## What it does

Hookspot is an open-source service that provides an end-point (ie. webhook) that updates your Hubspot lead profiles with a random number. This number can then be used to test different campaigns and workflows in Hubspot.

Here is how it works:
1. You create a [contact workflow](https://knowledge.hubspot.com/articles/kcs_article/workflows/how-do-i-use-webhooks-with-hubspot-workflows) in Hubspot that calls this webhook when a lead is created.
2. This webhook generates a random number between 1 and 100 based on the Hubspot lead id (aka VID).
3. This webhook updates Hubspot's lead profile with this number.

Then you can create campaigns in Hubspot that uses this random number to A/B test your campaigns.

## How to set it up

[![setup demo](https://img.youtube.com/vi/fUyxs3efiMs/0.jpg)](https://www.youtube.com/watch?v=fUyxs3efiMs)

1. Create a new contact property in Hubspot with `Number` as `field type` to store the assigned random number (eg. `Test bucket number` as property name).

2. Deploy this service to a platform like [Heroku](https://www.heroku.com/).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

3. After deploying, go into Settings and click on "Reveal Config Vars". Configure the following environment variables with the following:

```
HUBSPOT_API_KEY=zzz

PROPERTY_NAME=zzz
```

You can find your Hubspot API key under "Integrations" in your Hubspot settings.

The `PROPERTY_NAME` is the Hubspot "internal name" of the contact property you want this service to update (eg. `Test bucket number`) (it should match the name of the property you created at step 1)

4. Under Heroku Settings, find your domain. Usually it's https://{APP_NAME}.herokuapp.com/

5. Now go into Hubspot contact workflow and create a new one which has only one step: "trigger a webhook" with `POST` as the `method` and the url above as the `webhook URL` (do not check the use authentication checkbox).

6. Save and activate workflow

You're all set.

# A word of caution

Hubspot has strict [API usage guidelines](https://developers.hubspot.com/apps/api_guidelines) (for example, no more than 10 requests per seconds, and no more than 40,000 API requests per day). This webhook makes a Hubspot API request every time it is called. Make sure to set up a Hubspot workflow that calls this service responsibly (ie. use proper [workflow starting conditions](https://developers.hubspot.com/docs/faq/working-within-the-hubspot-api-rate-limits)).

# FAQ

### How is the "random" number generated?
The "random" number is actually generated deterministically based on on Hubspot VID ([visitor id](https://developers.hubspot.com/docs/methods/contacts/get_contact)).

The logic used is the following:
1. encrypt the vid to a 128-bit hash value which is represented by 32 characters using a hexdecimal representation (eg. `1` becomes `c4ca4238a0b923820dcc509a6f75849b`)
2. extract the first 12 characters from this hexdecimal representation (eg. `c4ca4238a0b923820dcc509a6f75849b` becomes `c4ca4238a0b9`)
3. convert it back to a base 10 representation (eg. `c4ca4238a0b9` becomes `216372973445305`)
4. get the last 2 digits from the decimal representation to get a number between 0 and 99 (eg. `216372973445305` becomes `5`)
5. add 1 to this number to get a number between 1 and 100 (eg. `5` becomes `6`)

Example of implementation in Node:
```
const md5 = require('blueimp-md5')
const hashed_string = parseInt(md5(string_to_hash).substring(0, 12), 16).toString()
const random_number = parseInt(hashed_string.substring(hashed_string.length - 2, hashed_string.length)) + 1
```

Example of implementation in SQL (redshift dialect):
```
CAST(RIGHT(STRTOL(LEFT(MD5(string_to_hash), 12), 16),2) AS INT) + 1
```

### Why do you use this logic to generate a random number?
The benefit of using a deterministic number generation is that it offers full transparency on where the number comes from and remove any question of "hidden bias". In other words, if there is a bias with the way the number is generated, it is transparent to all parties and can be easily reproduced on any data set.

It also ensures that the same user always stays in the same test bucket. 

# Credits
- Paul Cothenet at MadKudu
- Sam Levan at MadKudu
- Hanan Ayad at Shopify
- Adam McCabe at Shopify
