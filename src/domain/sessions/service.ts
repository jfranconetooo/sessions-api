import { NotFoundError, UnavailableTimeError } from './../../erros';
import { generateProfessionalsSessions, isTimeAvaiable } from './utils';
import { ISchedule, ISessionsData, ISessions } from './interfaces';
import { SessionsModel } from './models';

export default class SessionsService {

    /**
    * @method [domain/sessions] list()
    * @description this method returns, from a professional, the available times for each date reserved
    * @param  {string} code
    * @returns {Promise}
    */
    async list(code?: string): Promise<ISessions[]> {
        const query: Record<string,any> = {};
        if(code) query['_id'] = code;

        const data = await SessionsModel.find(query);
        if(!data) throw new NotFoundError("Not found");

        return generateProfessionalsSessions(data);
    }

    /**
    * @method [domain/sessions] create()
    * @description this method create,a session to a professional with their available times
    * @param  {object} body
    * @returns {Promise}
    */
    async create(body: ISessionsData): Promise<ISessionsData> {
        const session = new SessionsModel(body);
        return await session.save();
    }

    /**
    * @method [domain/sessions] delete()
    * @description this method remove a professional session
    * @param  {string} code
    */
    async delete(code: string): Promise<void> {
        await SessionsModel.findOneAndRemove({
            _id: code
        });
    }

    /**
    * @method [domain/sessions] schedule()
    * @description this method make an appointement to a professional session
    * @param {string} code
    * @param {object} payload
    */
    async schedule(code: string, payload: ISchedule): Promise<void> {
        const professional: any = await SessionsModel.findOne({_id: code});
        if(!professional) throw new NotFoundError("Not Found");

        const isAvaiable = isTimeAvaiable(professional.availability, payload.date, payload.hour);
        if(!isAvaiable) throw new UnavailableTimeError("Time is not avaiable");
        await SessionsModel.findOneAndUpdate({ _id: code, 'availability.date': payload.date}, 
            { 
                $push: {
                    'availability.$.booked_sessions': {
                        client: payload.client,
                        date: payload.date,
                        hour: payload.hour
                    }
                }
            },
            {upsert: true }
        )
    }

    /**
    * @method [domain/sessions] update()
    * @description this method make a update in a specific session from an professional
    * @param {string} code
    * @param {object} payload
    */
    async update(code: string, payload: ISchedule): Promise<ISessionsData> {
        const professional: any = await SessionsModel.findOneAndUpdate({_id: code}, payload, { new: true });
        if(!professional) throw new NotFoundError("Not Found");
        return professional;
    }
}