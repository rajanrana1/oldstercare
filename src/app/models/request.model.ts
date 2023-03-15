import { Registration } from "./registration.model";

export class Request {
    id?: any;
    registrationId?: any;
    service?: string;
    pickupPoint?: string;
    destination?: string;
    appointmentDate?: Date;
    pickupDate?: Date;
    appointmentTime?: Date;
    pickupTime?: Date;
    wheelChairAssisstance?: boolean;
    userComments?: string;
    status?: string;
    comments?: string;
    vendor?: any;
    contactPerson?: string;
    contactNumber?: string;
    registration?: Registration;
}
