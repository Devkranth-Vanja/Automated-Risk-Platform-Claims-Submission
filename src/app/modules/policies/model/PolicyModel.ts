export interface PolicyDto {
    policyId: string;
    claimantId: string
    policyNumber: string;
    policyType: string;
    startDate: string;
    endDate: string;
    description: string;
    claimantDetails?: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
    };
}