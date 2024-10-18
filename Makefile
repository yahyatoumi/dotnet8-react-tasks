# Makefile

# Define commands for docker-compose
.PHONY: up down build

# Rule to start Docker containers using docker-compose up
all:
	@echo "Starting Docker containers..."
	docker-compose up --no-cache -d

# Rule to stop Docker containers using docker-compose down
down:
	@echo "Stopping Docker containers..."
	docker-compose down

# Rule to build Docker containers using docker-compose build
build:
	@echo "Building Docker containers..."
	docker-compose build
