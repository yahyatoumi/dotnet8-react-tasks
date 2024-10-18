#!/bin/bash

# Wait for the database to be available (optional, if needed)
sleep 10

# Apply migrations

# Start the application with hot reload
dotnet bin/Debug/net8.0/server.dll
