import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { JoinOrganisationComponent } from './join-organisation.component';

export class JoinOrganisationPage {

    constructor(private fixture: ComponentFixture<JoinOrganisationComponent>) {
    }

    get organisationsList(){
        return this.fixture.debugElement.query(By.css('#join-organisation-orgList'));
    }

    get joinButton(){
        return this.fixture.debugElement.query(By.css('#join-organisation-joinButton'));
    }
}
