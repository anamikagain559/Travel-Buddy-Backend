import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
}

// Auth providers
export interface IAuthProvider {
    provider: string;  // "Google", "Credential"
    providerId: string;
}

// Main user interface
export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;                // Profile picture
    bio?: string;                    // Bio/About
    travelInterests?: string[];      // e.g., ["hiking", "photography"]
    visitedCountries?: string[];     // e.g., ["Bangladesh", "India"]
    currentLocation?: string;        // e.g., "Dhaka, Bangladesh"
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[];
}
