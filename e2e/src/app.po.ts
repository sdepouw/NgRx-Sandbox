import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo = (): Promise<unknown> => browser.get(browser.baseUrl) as Promise<unknown>;
  getTitleText = (): Promise<string> => element(by.css('h1')).getText() as Promise<string>;
  getGoodsButton = (): ElementFinder => element.all(by.css('button')).first();
  getTodoListItems = (): ElementArrayFinder => element.all(by.css('li'));
}
