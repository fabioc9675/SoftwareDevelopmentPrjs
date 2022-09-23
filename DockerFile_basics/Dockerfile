FROM ubuntu:18.04

# ADD app /app
COPY app /app
WORKDIR /app 

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip

RUN pip3 install -r pipreq.txt

EXPOSE 8888

CMD ["/bin/bash", "-c", "jupyter lab --ip='0.0.0.0' --port=8888 --no-browser --allow-root"]
