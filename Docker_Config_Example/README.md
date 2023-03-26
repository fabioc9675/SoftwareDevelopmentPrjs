# DOCKER EXAMPLE

## Tutorial Video

- https://www.youtube.com/playlist?list=PLT9hz9fCnlHKA54bDXqjh1oJU1MRKEwaD

## Docker use

- Install docker into your machine
- open DockerHub in internet to have access to different virtual machines

With docker Hub you can have access to different docker container images for different types of applications, for example, if you need python, it have the container image with everything that you need to run python app.

Please use just official docker images

- to pull an image use `docker pull <Image>:<Version>`, example `docker pull python:3.8-slim`
- to run use `docker run python:3.8-slim` or `docker run -d -t python:3.8-slim`
- to access the container use `docker exec -ti <container id> bash`
- to stop container use `docker stop <container id>`

- To specify parameters `docker run --rm -d -t --name=<NAME> -p <LOCALPORT>:<DOCKERPORT> <Image>:<Version>`
- To specify parameters and link current folder `docker run --rm -d -t --name=<NAME> -p <LOCALPORT>:<DOCKERPORT> --mount src="(pwd)",target=/app,type=bind <Image>:<Version>`

## Use of Docker compose

It is to use multiple docker containers at the same time

- need to create `docker-compose.yaml` file
- use `docker-compose up` to run the container
