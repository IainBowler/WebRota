import { browser, by, element } from 'protractor';

import { AuthService } from '../../../src/app/Services/Auth/auth.service';
import { User2Service } from './userManagement.service';
import { User } from '../../../src/app/Data/user';

export class AuthHelper {

    userManagement: User2Service = new User2Service();

    logout() {
        browser.get(browser.baseUrl);
        browser.executeScript('window.localStorage.clear();');
        browser.refresh();
    }

    addUser(email: string, password: string) {
        this.userManagement.getAllUsers().then((users) => {
            let user: User = new User('', '');
            users.forEach(arrayuser => {
                if (arrayuser.email === email) {
                    user = arrayuser;
                }
            });
            if (user.userId === '') {
                this.userManagement.createUser(email, password);
            }
        });
    }

    deleteUser(email: string) {
        this.userManagement.getAllUsers().then((users) => {
            let user: User = new User('', '');
            users.forEach(arrayuser => {
                if (arrayuser.email === email) {
                    user = arrayuser;
                }
            });
            if (user.userId !== '') {
                this.userManagement.deleteUser(user.userId);
            }
        });
    }
}
