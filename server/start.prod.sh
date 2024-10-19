#!/bin/bash

# Wait for the database to be available (optional, if needed)

# Apply migrations
dotnet ef database update || echo "No migrations were applied. The database is already up to datex."


# Start the application with hot reload
# sleep infinity
dotnet bin/release/net8.0/server.dll
