# Use lightweight Java image
FROM openjdk:17-jdk-slim

# Set working directory in container
WORKDIR /app

# Copy the whole project into the container
COPY . .

# Give permission to maven wrapper
RUN chmod +x ./mvnw

# Build the project (skip tests for speed)
RUN ./mvnw clean package -DskipTests

# Expose app port
EXPOSE 8080

# Run the JAR
CMD ["java", "-jar", "target/server-0.0.1-SNAPSHOT.jar"]
