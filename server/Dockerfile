# Use the .NET 8 SDK image for development, so you have access to tools like dotnet watch.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet build -c Debug --no-restore

# Install dotnet watch globally for development
RUN dotnet tool install --global dotnet-watch

# Set the environment path for dotnet tools
ENV PATH="${PATH}:/root/.dotnet/tools"

# Expose the development port
EXPOSE 8888

# Start the application with dotnet watch run for hot-reload
ENTRYPOINT ["dotnet", "watch", "run"]
