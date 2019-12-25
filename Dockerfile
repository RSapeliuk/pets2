

# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine


# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8085 available to the world outside this container
EXPOSE 7001

# The application's jar file
ARG LOCAL_JAR_FILE=target/pets2-0.0.1-SNAPSHOT.jar
#This is your <Jar_at_contatiner_name> rename it in the next line
ARG JAR_AT_CONTAINER_FILE_NAME=app.jar
# Add the application's jar to the container
ADD ${LOCAL_JAR_FILE} ${JAR_AT_CONTAINER_FILE_NAME}

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

#build script
#docker build -f Dockerfile -t app.jar .

# run script
#docker run -it -p exposePort:serverPort app
#docker run -it -p 7001:8080 app.jar


#list all containers
#Docker ps -a
#docker rm containerName


#    docker kill $(docker ps -q)
#     docker rm $(docker ps -a -q)
#     docker rmi $(docker images -q)

# Delete all containers
#docker rm $(docker ps -a -q)
# Delete all images
#docker rmi $(docker images -q)

