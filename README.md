# CinemaCalc

Assignment project for Those YoungBloods GmbH. This project is build with .NET, React with TypeScript and PostgreSQL.

## How to run the project locally?

To run this project locally, kindly follow the steps for each project.

### Back-End

The back-end is build with .NET version `8.0.401`. Make sure your .NET version is compatible with this version.

Edit the database connection string and point it to the right server with credentials. Since this project is build with PostgreSQL, make sure the server exists. You can find the `DefaultConnection` under `ConnectionStrings` in `CinemaCalc/CinemaCalc.WebApi/appsettings.json`.

Once the connection string is pointing to the right database server, go to the root of the project and run the following command to apply migrations.

```bash
dotnet ef database update --project CinemaCalc.Persistence/CinemaCalc.Persistence.csproj --startup-project CinemaCalc.WebApi/CinemaCalc.WebApi.csproj --context CinemaCalc.Persistence.Data.ApplicationDbContext --configuration Debug 20240928031710_AddedPrecision
```

After that, go the `CinemaCalc/CinemaCalc.WebApi` project and run the `dotnet run` command to start the server.

### Front-End

The front-end is build with Node `v20.13.1` and React with TypeScript.

For the front-end, go to the `CinemaCalc/ClientApp/CinemaCalc` folder.

Create an `.env` file with `VITE_API_URL` key having the value of the back-end API server. (see `.env.example` for an example)

Run `npm i` to install all the required packages.

Run `npm run dev` to run the application.

## 02. What is the overall structure of your code?

The backend is specifically structured using clean code architecture. I tried to create the same for the front-end but couldn't due to lack of time.

On backend, all the operations are divided into commands and queries and are called through MediatR. This ensures that the application isn't coupled to the API layer.

## 03. How do you manage state in your application? Why did you choose this solution?

For managing state on the front-end, I chose React Query for its easy interface and callbacks when something goes wrong. Using this library, I was able to easily achieve optimistic updates while the data was verified and saved on the backend.

In case of any error on the backend, it will quickly revert to its previous state, making sure the client is in sync with the backend server.

## 04. How does your approach for precise number calculations work?

For precise number calculations, I used `decimal` on the C# layer and `numeric(18,2)` on the database layer.

Since TypeScript doesn't support decimal natively, I have to reach out for a library called `decimal.js` to perform precise number calculations.

## 05. What „tasks“ did you have on your mind? How did you break down the different deliverables?

The first task I had in mind was to create the basic clean architecture, that is maintainable, for the backend as well as the frontend.

After that, I created a proof of concept to make sure everything works fine before moving on to styling.

## 06. Use the readme as a notepad to make us understand your thinking.