import { NotFoundError } from './../../../erros/index';
import {sessionsListResponse, sessionsCreatedResponse} from './sessions-dump';

export default class SessionsService {

    async list(code?: string): Promise<any[]> {
        let sessions = sessionsListResponse();
        if(code) {
            sessions = sessions.filter(s => s.professional.code === code);
            return sessions;
        };
        return sessions;
    }

    async create(body: any): Promise<any> {
        return sessionsCreatedResponse();
    }
}