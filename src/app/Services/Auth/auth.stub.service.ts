import { IAuthService } from './iauth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthStubService implements IAuthService {

    userProfile: any;

    authenticated: boolean = false;

    login(): void {
    }

    handleAuthentication(): void {
    }

    logout(): void {
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    getProfile(cb: any): void {
        cb();
    }

}
