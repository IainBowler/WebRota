
export interface IAuthService {

  userProfile: any;

  login(): void;

  handleAuthentication(): void;

  logout(): void;

  isAuthenticated(): boolean;

  getProfile(cb): void;

}