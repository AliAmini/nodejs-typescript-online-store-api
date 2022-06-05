# Online Store by Node.js & TypeScript
A online store based project with Node.js, TypeScript, Mongodb, JWT authentication, Jest & Supertest testing.

# Run Project
First of all we need to install dependecies. After that, we need to seed database and create initial user, products & categories. After that we will start the server.

```
yarn install
yarn seed-database
npm start
```

# API Endpoints
We have two main API endpoints on this project. 1. login 2. check product discount

## Login
We already added a user to database by running seeds. So you could get AccessToken with bellow request:

```js
// Request
POST: "http://localhost:3003/api/v1/auth/login"
Request Body: {
  email: "mail@gmail.com",
  password: "123456"
}

// Response
{
    "success": true,
    "accessToken": "eyJhbGciOiJIUzI1....JWT_TOKEN....."
}
```

## Checking Product Discount Percent
`Product` and `Category` models have `discountPercent` that store the discount in number. When we want to check discount percent of a product, first of all we check `Product` discount. If it has, so we response the response as a number. 

If `Product` didn't have a discount by itself, we check Sub Category that `Product` is related to it by `Product.category` property.

Also if SubCategory doesn't have any discount, we would check it's parent category for discount.

If it doesn't find any discount, it would response: `-1`

**Note:** This route is protected, so you need to store `AccessToken` to request Headers as `Authorization` header. 

```js
// # Request
// Route: /api/v1/product/discount/:productCode
// Headers: {"Authorization": `Bearer ${AccessToken}`}

GET: "http://localhost:3003/api/v1/product/discount/1"

// # Response:
5

// ---------------------------------------------------
// # Request:
GET: "http://localhost:3003/api/v1/product/discount/4"

// # Response:
-1
```


# Tests
The test are based on `Jest` and `Supertest`. We have different test to validating errors, false requests, and true requests.

You could run tests like this:

```
yarn test
```

