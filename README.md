# TravelKickstart

## Kickstarter but for travel
## with a social media setting

FUNDEE
For people who wants to go on a trip
to explore the world, do a humanitarian act,
see family
who doesn't have the money to do so
they can make a 'travel proposal' for the crowd to fund
Let's call 'travel proposal' a 'TP'

FUNDERS
Other people can fund them
especially those we are well-travelled
and who understands that travelling is an
essential part of life
They could purchase a 'Funding Purchase' aka FP

both have their 'feed' that shows the
recent, almost funded, most popular (other criteria) TP
and can also access their friends/connections
their own travels

other perks in a social media

Incentives such as souvenirs can be given to the
funders

* SAP Hybris YaaS
* Stripe (tokenize credit card and use Stripe API, then send to YaaS)
* MEAN stack


### Technologies
* SAP Hybris YaaS
  YaaS is used to back the financial aspect of the system
  and allows sellers to create a YaaS Product in the online
  Builder portal and control all aspects of the 'business'
  The YaaS Product will then be purchased by the funders

  The products and other operations to control the system
  are then exposed through a REST API
  that requires OAuth2

  AFAIK, Product is the only suitable 'object' for both TP and FP

  The challenge for TravelKickstart is that the funders don't
  'buy' the TP in full amount, and in usual cases
   would just pay a minimal amount, such as $5, $10

   To solve this, every FP (e.g. $5)
   should reduce the current funding of a TP

   i.e. call to POST/PUT FP must trigger POST/PUT of FP


https://www.yaas.io/
YaaS is a microservices ecosystem helping businesses
to rapidly augment and build new, highly flexible solutions.

https://builder.yaas.io/
Builder is used to make an organization
with a Project



* MEAN stack
followed this tutorial
https://thinkster.io/tutorials/mean-stack

mongoose models:
Persons - could be a Fundee or a Funder, based on if their travel property is an empty array
Travels

==================================================
:cry:

Not able to imlement app due to limited time constraint (24 hours - sleeping)
which is mostly spent learning MEAN (first time)
and trying to figure out the YaaS API (first time)
but it definitely is a great experience

:smile:


# What is working?
## MEAN stack fully working
- [x] Mongo is running, with Mongoose models also providing the domain object (/models)

- [x] Express is working, didnt touch the default options

- [x] AngularJS contains most of the logic
    * TravelCtrl - exposes the $scope travels and products to the HTML which displays through ```javascript ng-repeat ```
    * TravelService - uses ```javascript $http.get() ``` to request data from an 'internal' NodeJS served route [/travels]
                    and from 'external' route [https://api.yaas.io/hybris/product/v2/angularproject/products]

- [x] NodeJS is working

    [routes/index.js]  contains Monggose objects init. and ** internal routes **
    ```javascript
        router.get('/', function(req, res, next) { }

        router.get('/travels', function(req, res, next) { }

        router.post('/travels', function (req, res, next) { }
    ```
    serves one route: ```javascript router.get('/travels', function(req, res, next) { }```

## A lot of business logic still needs to be included
- [ ] Adding a new TP (Product0)
