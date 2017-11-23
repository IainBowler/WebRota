import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { StartComponent } from "./start.component";

export class StartPage {
    
    constructor(private fixture: ComponentFixture<StartComponent>){
    }

    getOrganisationsList(){
        return this.fixture.debugElement.query(By.css('#start-orgList'));
    }

    getJoinButton(){
        return this.fixture.debugElement.query(By.css('#start-joinButton'));
    }

    getNewOrganisationNameTextBox(){
        return this.fixture.debugElement.query(By.css('#start-organisationName'));
    }

    getCreateButton(){
        return this.fixture.debugElement.query(By.css('#start-createButton'));
    }
}
    