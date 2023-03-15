import { Request } from "./request.model";
export class Registration {
    id?: any;
    name?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: Date;
    streetAddress?: string;
    city?: string;
    state?: string;
    zip?: string;
    subscriptionPlan?: any;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactAddress?: string;
    status?: boolean;
    requests?: Request[];
}
