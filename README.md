# Cloud Computing of PondPedia

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

Cloud Computing of PondPedia connecting ML models and the Application (Mobile Development). For the application, we are using FastAPI for the Back-End, Cloud Run for containerized ML models and the API (Back-End). To make you more understand how "behind the scenes" of the Cloud Computing of PondPedia, this Readme will show you how to deploy a model for PondPedia prediction. Model training process is out of scope for this Readme, but you can find it in the Machine-Learning repo.

## Table of Contents

- [Installation](#installation)
- [License](#license)
- [Credits](#credits)
- [Usage](#usage)
- [Contributing](#contributing)


## Contributing

State if you are open to contributions and describe how other developers can contribute to your project. Include guidelines for submitting pull requests, reporting issues, or contacting the project maintainer.

## License

Specify the license under which your project is released. For example, you can use the MIT License. Include the license name, a brief description, and a link to the full license text.

## Installation
Provide step-by-step instructions on how to install and set up your project. Include any dependencies and specific configurations if necessary.

**Containerise the Machine Learning Model Using Docker**

Containerisation is the process of encapsulating your model and all of its dependencies into a self-contained, isolated package that can run consistently across different environments (e.g. locally, in the cloud, etc).

Below you can see a Dockerfile for our ML models.
```
# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.11-slim

# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
```

**Build the Docker Image**

Once the Dockerfile is defined, we need to build a Docker image based on it. It’s quite simple to build the image locally, all you need to do is to run the following command in the folder where your Dockerfile and the application code is.

`docker build -t ml-images:latest .`

This will create an image called `ml-images` and will save it locally. We can run `docker images` in our CLI to see it listed among the other Docker images we have.

**Push the Image to Google Artifact Registry**
There are five steps to this process:
- [ ] Configure Docker permissions to access our Artifact Registry
- [ ] Enable Artifact Registry in our GCP
- [ ] Create a repository in the Registry
- [ ] Tag our images using specific naming convention
- [ ] Push the image

To begin with, we need to determine in which location we want to have our container stored. To save credit, we will choose `asia-southeast1`, so the command for us is:
`gcloud auth configure-docker asia-southeast1-docker.pkg.dev`
For the first step of the process, we need to go to the Artifact Registry in the navigation menu then go to the Repositories and click `Create Repository` button. In the pop-up menu, specify that this is a Docker format and set its location equal to previouslt selected one (for us it's `asia-southeast1`).

All the setup is done, so let's begin the the main part. To tag an image with specific name and to push it we need to run two specific commands:

```docker tag IMAGE-NAME LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE-NAME
docker push LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE-NAME
```

Since the image name is `ml-images'`, repository name is `'ml-model` and my project ID is `pondpedia-project`, the commands for us look as follows:

```docker tag ml-images asia-southeast1-docker.pkg.dev/pondpedia-project/ml-model/ml-images
docker push asia-southeast1-docker.pkg.dev/pondpedia-project/ml-model/ml-images
```

The command will take some time to execute but once it's done, we'll be able see our Docker image in our Artificat Registry UI.

**Deploy Container on Google Cloud Run**

There are two ways to create a service in Cloud Run — through the CLI or in the UI. We're going to show you how to do it using CLI like do us.

```gcloud run deploy get-prediction \
      --image asia-southeast1-docker.pkg.dev/pondpedia-project/ml-model/ml-images \
      --region asia-southeast1 \
      --port 80 \
      --memory 4Gi
```

This command will create a `get-prediction` from the previously uploaded image in the Artifact Registry. In addition, it also specifies the region (the same as our Docker image), the port to expose, and the RAM available to the service.

## Usage
```mermaid
graph TD;
    User --> Application --> ML Model --> Application
```

## Credits
Acknowledge and give credit to any external libraries, frameworks, or resources you used in your project.

## Get All Pond Logs

**URL**

`/pondlogs`

**Method**

`GET`

**Headers**

- Authorization: `<token>`

**Response**

```json
{
  "error": false,
  "message": "Pond Logs fetched successfully",
  "PondLogs": [
    {
      "id": 1,
      "pondId": 1,
      "pond": {
        "pId": 1,
        "pondName": "Pond A",
        "pondLength": 6,
        "pondWidth": 5,
        "pondDepth": 2,
        "pondImageUrl": "https://story-api.dicoding.dev/images/stories/1.png"
        "pondFish": {
          "fId": 1,
          "fishName": "African Catfish",
          "fishScientificName": "Clarias gariepinus",
          "Amount": 100,
          "fishTarget": 600.0,
          "fishWeight": 30,
          "fishLength": 5
        },
        "pondFeed": {
          "feedName": "Default",
          "feedPercentage": 7.0,
          "feedProtein": 42.0,
          "feedLipid": 25.0,
          "feedCarbs": 20.0,
          "feedOthers": 13.0,
          "feedFrequency": 2
        },
        "pondWater": {
          "pondTemperature": 30.0,
          "pondTurbidity": 100.0,
          "pondOxygen": 70.0,
          "pondPH": 7.0,
          "pondAmmonia": 70.0,
          "pondNitrate": 2.0
        },
        "createdAt": "2022-01-08T06:34:18.598Z",
        "updatedAt": "2022-01-08T06:34:18.598Z"
      },
      "timestamps": "2022-01-08T06::18.598Z"
    },
    {
      "id": 2,
      "pondId": 1,
      "pond": {
        "pId": 1,
        "pondName": "Pond A",
        "pondLength": 6,
        "pondWidth": 5,
        "pondDepth": 2,
        "pondImageUrl": "https://story-api.dicoding.dev/images/stories/1.png"
        "pondFish": {
          "fId": 1,
          "fishName": "African Catfish",
          "fishScientificName": "Clarias gariepinus",
          "Amount": 100,
          "fishTarget": 600.0,
          "fishWeight": 30,
          "fishLength": 5
        },
        "pondFeed": {
          "feedName": "Default",
          "feedPercentage": 7.0,
          "feedProtein": 42.0,
          "feedLipid": 25.0,
          "feedCarbs": 20.0,
          "feedOthers": 13.0,
          "feedFrequency": 2
        },
        "pondWater": {
          "pondTemperature": 32.0,
          "pondTurbidity": 90.0,
          "pondOxygen": 72.0,
          "pondPH": 8.0,
          "pondAmmonia": 73.0,
          "pondNitrate": 3.0
        },
        "createdAt": "2022-01-08T06:34:18.598Z",
        "updatedAt": "2022-01-09T06:34:18.598Z"
      },
      "timestamps": "2022-01-09T06::18.598Z"
    },
    {
      "id": 3,
      "pondId": 2,
      "pond": {
        "pId": 1,
        "pondName": "Pond B",
        "pondLength": 4,
        "pondWidth": 5,
        "pondDepth": 1,
        "pondImageUrl": "https://story-api.dicoding.dev/images/stories/2.png"
        "pondFish": {
          "fId": 1,
          "fishName": "African Catfish",
          "fishScientificName": "Clarias gariepinus",
          "Amount": 100,
          "fishTarget": 700.0,
          "fishWeight": 40,
          "fishLength": 5
        },
        "pondFeed": {
          "feedName": "Default",
          "feedPercentage": 7.0,
          "feedProtein": 42.0,
          "feedLipid": 25.0,
          "feedCarbs": 20.0,
          "feedOthers": 13.0,
          "feedFrequency": 2
        },
        "pondWater": {
          "pondTemperature": 32.0,
          "pondTurbidity": 90.0,
          "pondOxygen": 72.0,
          "pondPH": 7.0,
          "pondAmmonia": 73.0,
          "pondNitrate": 3.0
        },
        "createdAt": "2022-01-09T06:34:18.598Z",
        "updatedAt": "2022-01-09T06:34:18.598Z"
      },
      "timestamps": "2022-01-09T06::18.598Z"
    },
  ]
}
```
## Get Pond Logs by ID

**URL**

`/pondlogs/:id`

**Method**

`GET`

**Headers**

- Authorization: `<token>`

**Response**

```json
{
  "error": false,
  "message": "Pond Logs fetched successfully",
  "PondLogs": [
    {
      "id": 1,
      "pondId": 1,
      "pond": {
        "pId": 1,
        "pondName": "Pond A",
        "pondLength": 6,
        "pondWidth": 5,
        "pondDepth": 2,
        "pondImageUrl": "https://story-api.dicoding.dev/images/stories/1.png"
        "pondFish": {
          "fId": 1,
          "fishName": "African Catfish",
          "fishScientificName": "Clarias gariepinus",
          "Amount": 100,
          "fishTarget": 600.0,
          "fishWeight": 30,
          "fishLength": 5
        },
        "pondFeed": {
          "feedName": "Default",
          "feedPercentage": 7.0,
          "feedProtein": 42.0,
          "feedLipid": 25.0,
          "feedCarbs": 20.0,
          "feedOthers": 13.0,
          "feedFrequency": 2
        },
        "pondWater": {
          "pondTemperature": 30.0,
          "pondTurbidity": 100.0,
          "pondOxygen": 70.0,
          "pondPH": 7.0,
          "pondAmmonia": 70.0,
          "pondNitrate": 2.0
        },
        "createdAt": "2022-01-08T06:34:18.598Z",
        "updatedAt": "2022-01-08T06:34:18.598Z"
      },
      "timestamps": "2022-01-08T06::18.598Z"
    },
    {
      "id": 2,
      "pondId": 1,
      "pond": {
        "pId": 1,
        "pondName": "Pond A",
        "pondLength": 6,
        "pondWidth": 5,
        "pondDepth": 2,
        "pondImageUrl": "https://story-api.dicoding.dev/images/stories/1.png"
        "pondFish": {
          "fId": 1,
          "fishName": "African Catfish",
          "fishScientificName": "Clarias gariepinus",
          "Amount": 100,
          "fishTarget": 600.0,
          "fishWeight": 30,
          "fishLength": 5
        },
        "pondFeed": {
          "feedName": "Default",
          "feedPercentage": 7.0,
          "feedProtein": 42.0,
          "feedLipid": 25.0,
          "feedCarbs": 20.0,
          "feedOthers": 13.0,
          "feedFrequency": 2
        },
        "pondWater": {
          "pondTemperature": 32.0,
          "pondTurbidity": 90.0,
          "pondOxygen": 72.0,
          "pondPH": 8.0,
          "pondAmmonia": 73.0,
          "pondNitrate": 3.0
        },
        "createdAt": "2022-01-08T06:34:18.598Z",
        "updatedAt": "2022-01-09T06:34:18.598Z"
      },
      "timestamps": "2022-01-09T06::18.598Z"
    },
  ]
}
```
