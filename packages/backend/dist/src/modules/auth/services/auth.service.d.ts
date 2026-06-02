import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    private googleClient;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
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
    validateUser(userId: string): Promise<{
        id: any;
        email: any;
        name: any;
        experienceYears: any;
        targetRole: any;
    }>;
    updateProfile(userId: string, dto: {
        name?: string;
        experienceYears?: number;
        targetRole?: string;
    }): Promise<{
        id: any;
        email: any;
        name: any;
        experienceYears: any;
        targetRole: any;
    }>;
    validateOrCreateGoogleUser(googleProfile: any): Promise<any>;
    verifyGoogleToken(token: string): Promise<{
        email: string | undefined;
        name: string | undefined;
        picture: string | undefined;
        googleId: string;
    }>;
    generateToken(user: any): string;
}
