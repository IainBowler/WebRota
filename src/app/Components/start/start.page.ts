import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StartComponent } from './start.component';

export class StartPage {

    constructor(private fixture: ComponentFixture<StartComponent>) {
    }

    get welcomeMessage(){
        return this.fixture.debugElement.query(By.css('#start-welcomeMessage'));
    }
}
