import moment from 'moment';
import { ISessionsData, IAvailability, ISessions } from './interfaces';
const format = "HH:mm";

export const generateProfessionalsSessions = (data: any[]): ISessions[]  => {
    return data.map((elem: ISessionsData) => ({
        professional: {
            name: elem.professional,
            code: elem._id
        },
        availability: mountProfessionalDisponibility(elem.availability)
    }));
}

const mountProfessionalDisponibility = (availability: IAvailability[], nextSlot= 30) => {
    const professional_availability = availability
    .filter((elem: IAvailability) => moment(elem.date) >= moment())
    .map((elem: IAvailability) => {
        const bookedTimes = elem.booked_sessions?.map((elem) => (elem.hour));
            const available_times = elem.interval_hours.map(interval => {
                const times = generateSlotTimes(interval.startTime, interval.endTime, 
                    bookedTimes, nextSlot);
                return times;
            });

            const hours: string[] = [].concat(...available_times as [])
            return {
                date: moment(elem.date).format("dddd LL"),
                hours
            }
    });

    return professional_availability;
}

const isBooked = (slotTime: moment.Moment, bookedTimes: string[], nextSlot = 30) => {
    return bookedTimes.some((bt) => {
        return slotTime >= moment(bt, format).subtract({ minutes: nextSlot }) && slotTime <= moment(moment(bt, format).add({ minutes: nextSlot}).format(format), format)
    })
}

const generateSlotTimes = (startTime: string, endTime: string, bookedTimes: string[] = [], nextSlot: number) => {
    const slotTime: moment.Moment = moment(startTime, format);
    const slotEndTime: moment.Moment = moment(endTime, format).subtract({ minutes: nextSlot });
    const times = [];
    while(slotTime < slotEndTime) {
        if(!isBooked(slotTime, bookedTimes)) {
            times.push(slotTime.format(format));
        }
        slotTime.add({ minutes: nextSlot });
    }
    return times;
}


export const isTimeAvaiable = (availability: IAvailability[], date: Date, hour: string) => {
    const professional_availability = mountProfessionalDisponibility(availability);
    return professional_availability.some(el => {
        return moment(el.date).format('dddd LL') === moment(date).format('dddd LL') && el.hours.indexOf(hour) > -1
    })
}   
