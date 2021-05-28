export interface ISessionsData {
    _id?: string,
    professional: string
    availability: [
        IAvailability
    ]
}

export interface IAvailability {
    _id: string,
    date: string,
    interval_hours: [
        {
            startTime: string,
            endTime: string
        }
    ],
    booked_sessions?: [
        {
            customer: string,
            date: Date,
            hour: string
        }
    ]
}

export interface ISchedule {
    date: Date,
    hour: string,
    client: string
}

export interface ISessions {
    professional: {
        name: string;
        code: string | undefined;
    };
    availability: ({
        date: string;
        hours: string[];
    } | undefined)[];
}


