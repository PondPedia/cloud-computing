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
