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
I could not use docker during development due some issues . So, you would have to run locally.This involves cloning this repository, so go ahead with that first.

## Local Environment
---
Foremost, you have to clone this repository and install all the dependencies with the following commands.
```bash
git clone https://github.com/caleberi/MMK-ASSIGNMENT.git
cd MMK-ASSIGNMENT
npm install

```
Rename the `src/config.env.example` to `.env` and customize it to your local machines specifications.
**Note**: `DATABASE_URL` will not be created automatically and would need to ba manually created.

Run `npm run make:serve` to start the local server.

### NPM scripts

- `npm run build`: Run build
- `npm run lint`: To  lint the project
- `npm run start`: Run the project locally

check the `package.json` for more reference.
## API Reference/Documentation
A swagger documentation can be found at `http://localhost:3000/docs` or `https://mmk-assignment.herokuapp.com/docs/`
## Authors

**[Adewole Caleb](https://github.com/caleberi)**
        
