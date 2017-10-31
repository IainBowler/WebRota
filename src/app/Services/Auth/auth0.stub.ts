

export class Auth0client {
    private userInfoObj;

    setuserInfoInfo(err, profile) {
        this.userInfoObj = { err: err, profile: profile };
    }

    userInfo(accessToken, callback) {
        callback(this.userInfoObj.err, this.userInfoObj.profile);
    }
}

export class Auth0Stub {

    client: Auth0client = new Auth0client();
    private parseHashObj = { err: null, authResult: null };
    
    authorize() {
    }

    setGoodParseHashInfo() {
        const authResult = { accessToken: 'accessToken', idToken: 'idToken', expiresIn: 3600 }    
        this.parseHashObj = { err: null, authResult: authResult };
    }

    parseHash(callback) {
        callback(this.parseHashObj.err, this.parseHashObj.authResult)
    }
}