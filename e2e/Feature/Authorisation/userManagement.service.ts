import * as request from 'request';
import { User } from "../../../src/app/Data/user";

export class User2Service {

  expiryDate: Date = new Date();
  
  userUrl: string = 'https://iainbowler.eu.auth0.com/api/v2/users';
  
  authAccessToken: string;

  private getNewToken(): Promise<void>{
    return new Promise<void>((resolve, reject) => {

      let urlString: string = 'https://iainbowler.eu.auth0.com/oauth/token';

      let bodyObject = { grant_type: 'client_credentials',
                   client_id: 'LuAI7y3TKAQKyQEmj3PABRX5AUWn6c6Y',
                   client_secret: 'ZKrJ9XbtLRVhrMhmedW_MHy3jqZn8QNtmNwfnyLahcC1dWbm-v5tjf4YCmGhoht5',
                   audience: 'https://iainbowler.eu.auth0.com/api/v2/'};

      let options = { method: 'POST',
                        url: 'https://iainbowler.eu.auth0.com/oauth/token',
                        headers: { 'content-type': 'application/json' },
                        body: 
                        { grant_type: 'client_credentials',
                            client_id: 'LuAI7y3TKAQKyQEmj3PABRX5AUWn6c6Y',
                            client_secret: 'ZKrJ9XbtLRVhrMhmedW_MHy3jqZn8QNtmNwfnyLahcC1dWbm-v5tjf4YCmGhoht5',
                            audience: 'https://iainbowler.eu.auth0.com/api/v2/' },
                        json: true };

      request(options, (error, response, body) => {
        this.expiryDate.setTime(Date.now() + (body.expires_in * 1000));
        this.authAccessToken = body.access_token;
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  private checkForValidAccessToken(): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      if(this.expiryDate.getTime() < Date.now()) {
        this.getNewToken().then( () => {
          resolve();
        });  
      }
      else {
        resolve();
      }
    });
  }

  getAllUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {    
      this.checkForValidAccessToken().then(() => {
        let options = { url: this.userUrl,
                        method: 'GET',
                        headers: { authorization: 'Bearer ' + this.authAccessToken }
        };
        request(options, (error, response, body) => {
          let users: User[] = [];
          let data = JSON.parse(body);
          for (var index = 0; index < data.length; index++) {
            var user = data[index];
            users.push(new User(user.user_id, user.email));
          }
          resolve(users);
        }, (error) => {
          reject(error);
        });
      });
    });
  }

  createUser(email: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.checkForValidAccessToken().then(() => {
        let bodyObject = {
          "connection": "Username-Password-Authentication",
          "email": email,
          "password": password
        };
        
        let options = { url: this.userUrl,
                        method: 'POST',
                        headers: { authorization: 'Bearer ' + this.authAccessToken,
                                  'content-type': 'application/json' },
                        body: bodyObject,
                        json: true
        };

        request(options, (error, response, body) => {
        if (error)
            reject(error);
        else
            resolve(new User(body.user_id, body.email));
        });
      });
      resolve(new User("body.user_id", "body.email"));
    });
  }

  deleteUser(userId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.checkForValidAccessToken().then(() => {
        let options = { url: this.userUrl + '/' + userId,
                        method: 'DELETE',
                        headers: { authorization: 'Bearer ' + this.authAccessToken },
        };

        request(options, (error, response, body) => {
            resolve();
        }, (error) => {
          reject(error);
        });
      });
    });
  }
}