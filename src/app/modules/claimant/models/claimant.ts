export interface Claimant {
    claimantId?: number; // optional, used for edit/update cases

    // Personal Information
    firstName: string;
    middleName?: string;
    lastName: string;
    dob: string; // ISO date (e.g., '1990-05-23')
    maritalStatus?: string;
    nationality?: string;

    // Contact Information
    email: string;
    confirmEmail: string;
    phone: string;
    altPhone?: string;

    // Address
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;

    // Identification
    passport?: string;
    driverLicense?: string;
    taxId?: string;

    // Credit Card Info
    cardNumber?: string;
    cardExpiry?: string;
    cardCVV?: string;
    cardHolder?: string;

    // Additional
    notes?: string;
}
