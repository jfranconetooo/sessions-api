export const sessionsListResponse = () => ([
    {
        "professional": {
            "name": "Carlos",
            "code": "60b000cc76cfc0001499ebec"
        },
        "availability": [
            {
                "date": "Monday May 31, 2021",
                "hours": [
                    "13:00",
                    "13:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "17:00",
                    "17:30",
                    "18:00"
                ]
            }
        ]
    }
]);



export const sessionsCreatedResponse = () => ({
    "_id": "60b0382c8b61f24ae8cceaaa",
    "professional": "Carlos",
    "availability": [
        {
            "_id": "60b0382c8b61f24ae8cceaab",
            "date": "2021-05-31T03:00:00.000Z",
            "interval_hours": [
                {
                    "_id": "60b0382c8b61f24ae8cceaac",
                    "startTime": "13:00",
                    "endTime": "16:00"
                },
                {
                    "_id": "60b0382c8b61f24ae8cceaad",
                    "startTime": "17:00",
                    "endTime": "19:00"
                }
            ],
            "booked_sessions": []
        }
    ],
    "created": "2021-05-28T00:24:12.201Z",
    "updated": "2021-05-28T00:24:12.201Z",
    "__v": 0
});