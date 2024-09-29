# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the solution and projects
COPY CinemaCalc.sln ./
COPY CinemaCalc.Application/ CinemaCalc.Application/
COPY CinemaCalc.Domain/ CinemaCalc.Domain/
COPY CinemaCalc.Persistence/ CinemaCalc.Persistence/
COPY CinemaCalc.WebApi/ CinemaCalc.WebApi/

# Restore dependencies
RUN dotnet restore CinemaCalc.WebApi/CinemaCalc.WebApi.csproj

# Build the project
RUN dotnet publish CinemaCalc.WebApi/CinemaCalc.WebApi.csproj -c Release -o /out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the output from the build stage
COPY --from=build /out .

EXPOSE 8080

# Set the entrypoint to start the application
ENTRYPOINT ["dotnet", "CinemaCalc.WebApi.dll"]