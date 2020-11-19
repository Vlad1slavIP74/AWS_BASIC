import { Data } from "aws-sdk/clients/apigatewaymanagementapi";

export class GetProfileDTO {
    readonly id: string;
    readonly role: string;
    readonly firstName: string;
    readonly lastName: string;
    
    readonly createdAt: Data;
    readonly updatedAt: Data; 
}