# Makefile

# Define paths
CLIENT_DIR=./client
SERVER_DIR=./server

# Define commands for each step
.PHONY: client server

# Rule to navigate to ./client and run npm install and npm run dev
client:
	@echo "Navigating to $(CLIENT_DIR) and running npm install and npm run dev..."
	cd $(CLIENT_DIR) && npm install && npm run dev

# Rule to navigate to ./server and run dotnet run
server:
	@echo "Navigating to $(SERVER_DIR) and running dotnet run..."
	cd $(SERVER_DIR) && dotnet run

# Rule to run both client and server simultaneously
all: client server
