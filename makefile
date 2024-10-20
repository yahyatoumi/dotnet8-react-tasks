# Makefile

# Define commands for docker-compose
.PHONY: up down build

# Rule to start Docker containers using docker-compose up
all: build
	@echo "Starting Docker containers..."
	docker-compose up -d
	@echo "program will sleep for 10 seconds just to make sure everything will work fine."
	sleep 10
	@echo "cypress should start soon, if it has not or if an error accured try start it yourself, npx cypress run --project ./cypress"
	@echo "to test the controller alone with xunit, dotnet test --project ./cypress"
	npx cypress run --project ./cypress
	

# Rule to stop Docker containers using docker-compose down
down:
	@echo "Stopping Docker containers..."
	docker-compose down

# Rule to build Docker containers using docker-compose build
build:
	@echo "Building Docker containers..."
	cd server
	dotnet publish -c Release
	docker-compose build  --no-cache