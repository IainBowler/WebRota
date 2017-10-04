import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { NavComponent } from "./nav.component";

export class NavPage {
    
    constructor(private fixture: ComponentFixture<NavComponent>){
    }

    getLoginButton(){
        return this.fixture.debugElement.query(By.css('#nav.login'));
    }

    getLogoutButton(){
        return this.fixture.debugElement.query(By.css('#nav.logout'));
    }
}
    