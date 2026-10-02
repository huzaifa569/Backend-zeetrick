# API Endpoints

This document lists the HTTP endpoints registered by the Express application.

- **Base URL:** `http://localhost:3000`
- **JSON requests:** Send `Content-Type: application/json` when sending a JSON body.
- **Authentication:** No route-level authentication middleware is registered for these endpoints. The login and registration endpoints issue tokens; the routes do not require an authentication header.
- **Path parameters:** `:id` is the record identifier path parameter.

## Service

| Method | Endpoint | Purpose | Parameters / body | Headers / authentication |
|---|---|---|---|---|
| GET | `/` | Confirms that the Express server is running. | None. | No authentication required. |

## Authentication

| Method | Endpoint | Purpose | Parameters / body | Headers / authentication |
|---|---|---|---|---|
| POST | `/api/register/register` | Registers a user and returns a token; also sets an HTTP-only `token` cookie. | JSON body (all required): `firstName`, `lastName`, `email`, `gender`, `age`, `password`. `gender` must be `Male`, `Female`, or `Other`; password must be at least 6 characters; age must be a non-negative number. | `Content-Type: application/json`. No authentication required. |
| POST | `/api/login` | Authenticates a user and returns a token. | JSON body (required): `email`, `password`. | `Content-Type: application/json`. No authentication required. |

## Products

| Method | Endpoint | Purpose | Parameters / body | Headers / authentication |
|---|---|---|---|---|
| POST | `/api/addproduct` | Creates a product. | JSON body (required): `productName`, `optionList`, `price`, `stock`. `image` is also read by the handler but is not required there. | `Content-Type: application/json`. No authentication required. |
| GET | `/api/addproduct` | Retrieves all products. | None. | No authentication required. |
| GET | `/api/addproduct/:id` | Retrieves product data for the specified ID. | Path parameter: `id`. | No authentication required. |
| PUT | `/api/addproduct/:id` | Updates a product. | Path parameter: `id`. JSON body (required): `productName`, `optionList`, `price`, `stock`. `image` is also read by the handler but is not required there. | `Content-Type: application/json`. No authentication required. |
| DELETE | `/api/addproduct` | Deletes all products. | None. | No authentication required. |
| DELETE | `/api/addproduct/:id` | Deletes a product by ID. | Path parameter: `id`. | No authentication required. |

## Customers

| Method | Endpoint | Purpose | Parameters / body | Headers / authentication |
|---|---|---|---|---|
| POST | `/api/addCustomer` | Creates a customer. | JSON body (required): `name`, `email`, `location`, `orders`, `optionList`. | `Content-Type: application/json`. No authentication required. |
| GET | `/api/addCustomer` | Retrieves all customers. | None. | No authentication required. |
| GET | `/api/addCustomer/:id` | Retrieves customer data for the specified ID. | Path parameter: `id`. | No authentication required. |
| PUT | `/api/addCustomer/:id` | Updates a customer. | Path parameter: `id`. JSON body (required): `name`, `email`, `location`, `orders`, `optionList`. | `Content-Type: application/json`. No authentication required. |
| DELETE | `/api/addCustomer` | Deletes all customers. | None. | No authentication required. |
| DELETE | `/api/addCustomer/:id` | Deletes a customer by ID. | Path parameter: `id`. | No authentication required. |

## Reviews

| Method | Endpoint | Purpose | Parameters / body | Headers / authentication |
|---|---|---|---|---|
| POST | `/api/reviews` | Creates a review. | JSON body (required): `CustomerName`, `Rating`, `ProductName`, `Comment`, `Date`, `Status`. | `Content-Type: application/json`. No authentication required. |
| GET | `/api/reviews` | Retrieves all reviews. | None. | No authentication required. |
| GET | `/api/reviews/:id` | Retrieves review data for the specified ID. | Path parameter: `id`. | No authentication required. |
| PUT | `/api/reviews/:id` | Updates a review. | Path parameter: `id`. The handler reads `CustomerName`, `Rating`, `ProductName`, `Comment`, `Date`, and `Status` from the JSON body; it does not enforce that these fields are present. | `Content-Type: application/json`. No authentication required. |
| DELETE | `/api/reviews` | Deletes all reviews. | None. | No authentication required. |
| DELETE | `/api/reviews/:id` | Deletes a review by ID. | Path parameter: `id`. | No authentication required. |
