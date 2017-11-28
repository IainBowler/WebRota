import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { CreateOrganisationComponent } from "./create-organisation.component";

export class CreateOrganisationPage {
    
    constructor(private fixture: ComponentFixture<CreateOrganisationComponent>){
    }

    get newOrganisationNameTextBox(){
        return this.fixture.debugElement.query(By.css('#create-organisation-organisationName'));
    }

    get createButton(){
        return this.fixture.debugElement.query(By.css('#create-organisation-createButton'));
    }
}
    