import { Page, Locator } from '@playwright/test';

//My Class
export class PracticeFormPage {
  private readonly page: Page;
 private readonly firstNameInput: Locator;
 private readonly lastNameInput: Locator;
 private readonly emailInput: Locator;
 private readonly genderRadio: (gender: 'Male' | 'Female' | 'Other') => Locator;
 private readonly mobileInput: Locator;
  private readonly dobInput: Locator;
  private readonly subjectsInput: Locator;
  private readonly hobbiesCheckbox: (hobby: 'Sports' | 'Reading' | 'Music') => Locator;
  private readonly uploadPictureInput: Locator;
  private readonly currentAddressInput: Locator;
  private readonly stateDropdown: Locator;
  private readonly cityDropdown: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderRadio = (gender) => page.getByText(gender, { exact: true });
    this.mobileInput = page.locator('#userNumber');
    this.dobInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.hobbiesCheckbox = (hobby) => page.getByText(hobby, { exact: true });
    this.uploadPictureInput = page.locator('#uploadPicture');
    this.currentAddressInput = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitBtn = page.locator('#submit');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillForm(details: {
    firstName: string, lastName: string, email: string, 
    gender: 'Male' | 'Female' | 'Other', mobile: string, 
    subject: string, address: string, state: string, city: string
  }) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.genderRadio(details.gender).click();
    await this.mobileInput.fill(details.mobile);
    
    // Handling Subjects (requires typing + Enter)
    await this.subjectsInput.fill(details.subject);
    await this.page.keyboard.press('Enter');

    await this.hobbiesCheckbox('Sports').click();
    await this.currentAddressInput.fill(details.address);

    // State & City dropdowns
    await this.stateDropdown.click();
    await this.page.getByText(details.state, { exact: true }).click();
    await this.cityDropdown.click();
    await this.page.getByText(details.city, { exact: true }).click();

    await this.submitBtn.click();
  }

  /**
   * Closes the success modal after form submission so another iteration can start from a clean state.
   */
  async closeSuccessModal() {
    const closeButton = this.page.locator('#closeLargeModal');
    await closeButton.click();
    await this.page.waitForSelector('.modal-content', { state: 'hidden' });
  }
}
