<h1 align="center">crm-service-api by Beatriz Avis</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/NishyIR" target="_blank">
    <img alt="Twitter: NishyIR" src="https://img.shields.io/twitter/follow/NishyIR.svg?style=social" />
  </a>
</p>

API built with ``NodeJS`` and ``Express`` connected to ``MongoDB`` with ``Mongoose``.

## Download

```sh
git clone https://github.com/BeAvisP/crm-service-api.git

cd crm-service-api
```

## Install

```sh
npm install
```
This command will install all the dependencies needed to run de API.

## Initial configuration

In order to start using the API you need to have create an Admin ``user`` in the database.

In the ``bin`` folder you will find the script to create the first ``user`` in `` seeds.js ``.

By default the ``user`` created will be:
```
 {
  email: 'admin@crm-service.com',
  firstname: 'Admin',
  lastname: 'User',
  password: '123456,
  role: 'admin',
}
```
Feel free to change the data in the ``seeds.js`` file with the values you need.

Execute the next command to create de ``user``:

```sh
node bin/seeds.js
```

## Usage

To run build and run the API:
```sh
npm run start
```
The URL of the API will be ``localhost:3001``

## Endpoints Table

| HTTP Method | Endpoint             | Request Body                                   | Success status | Error Status | Description                                       |
| ----------- | -------------------- | ---------------------------------------------- | -------------- | ------------ | ------------------------------------------------- |
| GET         | `/api/auth/loggedin` | Saved session                                  | 200            | 500          | Check if user is logged in and return the user    |
| POST        | `/api/auth/login`    | { email, password }                            | 200            | 401 - 500    | User login - Return the user                      |
| POST        | `/api/auth/logout`   |                                                | 200            |              | User logout                                       |
| POST        | `/api/auth/new`      | { firstname, lastname, email, password, role } | 201            | 400 - 500    | Create new user - Only allowed for Admins         |
| GET         | `/api/auth/users`    |                                                | 200            | 500          | Return all users - Only allowed for Admins        |
| GET         | `/api/auth/:id`      |                                                | 200            | 500          | Return user info - Only allowed for Admins        |
| PUT         | `/api/auth/:id`      | { firstname, lastname, role }                  | 200            | 500          | Edit user info and role - Only allowed for Admins |
| DELETE      | `/api/auth/:id`      |                                                | 200            | 500          | Delete user - Only allowed for Admins             |
| GET         | `/api/customers`     |                                                | 200            | 500          | Return all customers - Auth is required           |
| POST        | `/api/customers`     | { name, surname, photo }                       | 201            | 400 - 500    | Create new customer - Auth is required            |
| GET         | `/api/customers/:id` |                                                | 200            | 500          | Return customer by id - Auth is required          |
| PUT         | `/api/customers/:id` | { name, surname, photo }                       | 200            | 500          | Edit customer info - Auth is required             |
| DELETE      | `/api/customers/:id` |                                                | 200            | 500          | Delete customer - Auth is required                |

## Author

👤 **Beatriz Avis**

- Twitter: [@NishyIR](https://twitter.com/NishyIR)
- Github: [@BeAvisP](https://github.com/BeAvisP)
- LinkedIn: [@beatrizavis](https://linkedin.com/in/beatrizavis)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
