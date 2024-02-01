## Restaurant Reservation System

>This app is a reservation system for a restaurant to use.
>It allows the employee to create tables in the system to sit reservations at and create reservations for their customers ahead of time.
>The employee will also be able to edit a reservations details, sit the reservation at a table when they arrive, and finish the reservation to free up the table when finished.
>Lastly, the employee will be able to search their database by mobile number and see all reservations for that customer.

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5001` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |

## The Application:
[Deployed Application on Render](https://capstone-restaurant-reservation-system-8zag.onrender.com)
[Deployed Backend on Render](https://capstone-restaurant-reservation-system-unpb.onrender.com/)
Render deployed backend must run in order for the app to work.
Note: Back-end needs either /reservations or /tables route to render data.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to a PostgreSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start the server in development mode.


## Usage Examples:
![Dashboard view of a given date](https://github.com/TimBennett585/Capstone-restaurant-reservation/assets/141341820/afc51be1-af7e-402c-9cee-ae36e449f9ee)

![Creating a new Reservation](https://github.com/TimBennett585/Capstone-restaurant-reservation/assets/141341820/8e99d4d9-2279-413f-bb41-81496d085759)

![Adding a new table to seat customers at](https://github.com/TimBennett585/Capstone-restaurant-reservation/assets/141341820/c9439f48-7ca1-4f70-ad80-67e55f1d7453)

![Search function to find reservations](https://github.com/TimBennett585/Capstone-restaurant-reservation/assets/141341820/c3e56804-639b-4e3e-a74e-0fa6bcbd5bcc)

![Seating a reservation at a table](https://github.com/TimBennett585/Capstone-restaurant-reservation/assets/141341820/2c6dcdc2-e399-4731-acfe-87fd03f0d303)

## API:
> The API works with two primary routes.
> /reservations to list and use CRUD functions on the reservations of customers
> /tables to list and use CRUD functions on the tables of the restaurant

## Frameworks/Languages:
>This app utilizes Javascript, HTML and some CSS.
>It uses Node.js, Express, React and Knex.


## This app built as the final Capstone project in Thinkful/Chegg Skill's Full-Stack Engineering Program
