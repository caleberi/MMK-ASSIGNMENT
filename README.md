![icon](https://www.mymoneykarma.com/assets/img/logo-light.png)
# MMK ASSIGNMENT SOLUTION
---
> A technical interview solution to mmk backend role
> 
You can get the shared collection file via [postman](https://www.getpostman.com/collections/04990c94f1aa44edae01).
Taking a stern look into the problem statement provided by the mymoneykarma interviewer. I was told to build an application that support caching , rate-limiting and almost others .

Sellers can also create products for each stores.
This project uses `typescript` since it is easier to manage compared to `javascript`.
Technologies used:

- Typescript
- Postgres
- Redis

The project folder directory is divided into

- `src` : contains the application entry point.
- `spec` : contains the test files for both unit testing and integration test 

## Running this project
---
I could not use docker during development due some issues . So, you would have to run locally.
This involves cloning this repository, so go ahead with that first.

### Running the service 
- Running the client-app: Navigate into the client directory and run
```bash
  $ yarn install 
```
- Build the project 
```bash
  $ npm run build
```
- Running the server :
```bash
  $ npm run start
```

