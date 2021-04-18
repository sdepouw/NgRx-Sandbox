import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  const page = new AppPage();

  it('should display everything properly', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('My Todos');

    page.getGoodsButton().click();

    // TODO: For some reason, this promise does not resolve until the displayMessage() dipsatch finishes.
    expect(page.getTodoListItems().isPresent()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
