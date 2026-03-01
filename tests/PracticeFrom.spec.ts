import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { DataLoader } from '../utils/DataLoader';
import { AlertHandler } from '../utils/AlertHandler';
import { AllureUtils } from '../utils/AllureUtils';

// load all user records from CSV once
const records = DataLoader.getCsvData('data.csv') as Array<{
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  subject: string;
  address: string;
  state: string;
  city: string;
}>;

test.describe('DemoQA Practice Form', () => {
  test.beforeEach(async ({ page }) => {
    await AlertHandler.setup(page);
  });

  for (const userData of records) {
    test(`submit form for ${userData.firstName} ${userData.lastName}`, async ({ page }) => {
      // label this test in Allure so reports show "Practice Form" feature
      AllureUtils.label(test.info(), 'feature', 'Practice Form');
      const practiceForm = new PracticeFormPage(page);

      // step navigation and form completion
      await test.step('fill practice form', async () => {
        await practiceForm.goto();
        await practiceForm.fillForm(userData);
        // attach row data for debugging in report via helper
        AllureUtils.attachJson(test.info(), 'input-data', userData);
      });

      // assertion block with allure steps
      await test.step('verify submission', async () => {
        const successModal = page.locator('.modal-content');
        await expect(successModal).toBeVisible();
        await expect(successModal).toContainText('Thanks for submitting the form');
        await expect(page.locator('.table-responsive')).toContainText(
          `${userData.firstName} ${userData.lastName}`
        );
      });

      // refresh page to guarantee fresh start
      await page.reload();
    });
  }
});
