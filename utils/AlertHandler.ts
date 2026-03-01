// utils/AlertHandler.ts
import { Page, Dialog } from '@playwright/test';

export class AlertHandler {
  static async setup(page: Page) {
    // Handle Browser Alerts (Auto-dismiss and Log)
    page.on('dialog', async (dialog: Dialog) => {
      console.log(`[ALERT DETECTED]: "${dialog.message()}"`);
      await dialog.dismiss();
    });

    // Handle Network Failures
    page.on('response', response => {
      if (response.status() >= 400) {
        console.error(`[NETWORK ERROR]: ${response.status()} on ${response.url()}`);
      }
    });
  }
}
