import { RequestForCooperationStatus } from "../enums/request-for-cooperation-status.enum";

export interface IRequestForCooperation {
    id: number;
    message: string;
    recipient_id: number;
    sender_id: number;
    status: RequestForCooperationStatus,
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
