# Use an official OpenJDK runtime as a parent image
FROM openjdk:20

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/orderservice.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "app.jar"]
