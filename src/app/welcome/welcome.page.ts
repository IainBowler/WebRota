import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { WelcomeComponent } from "./welcome.component";

export class WelcomePage {
    
    private welcomeMessage: HTMLElement = this.fixture.debugElement.query(By.css('#welcome-title')).nativeElement
    private cucumberReportLink: HTMLElement = this.fixture.debugElement.query(By.css('#welcome-cucumberReportLink')).nativeElement;

    constructor(private fixture: ComponentFixture<WelcomeComponent>){
    }

    getWelcomeMessage(): string {
        return this.welcomeMessage.textContent;
    }

    getCucumberReportLink(){
        return this.cucumberReportLink.getAttribute('href');
    }
}
    