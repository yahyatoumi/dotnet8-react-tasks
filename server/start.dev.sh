#!/bin/bash

# Wait for the database to be available (optional, if needed)
# sleep 10

# Apply migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

# Start the application with hot reload
dotnet watch run
