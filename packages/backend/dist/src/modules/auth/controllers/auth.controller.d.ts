import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import express from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
    getProfile(req: any): Promise<{
        id: any;
        email: any;
        name: any;
        experienceYears: any;
        targetRole: any;
    }>;
    updateProfile(dto: {
        name?: string;
        experienceYears?: number;
        targetRole?: string;
    }, req: any): Promise<{
        id: any;
        email: any;
        name: any;
        experienceYears: any;
        targetRole: any;
    }>;
    googleToken(dto: {
        token: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            name: any;
            experienceYears: any;
            targetRole: any;
            picture: string | undefined;
        };
    }>;
    googleAuthCallback(req: any, res: express.Response): Promise<void>;
}
