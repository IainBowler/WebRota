import { WebRotaPage } from './app.po';

describe('web-rota App', () => {
  let page: WebRotaPage;

  beforeEach(() => {
    page = new WebRotaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
