import { TestInfo } from '@playwright/test';

/**
 * Small helper methods for attaching additional information to Allure
 * reports from within tests.
 */
export class AllureUtils {
  /**
   * Attach an arbitrary object as JSON into the report.
   */
  static attachJson(info: TestInfo, name: string, obj: any) {
    info.attachments.push({
      name,
      contentType: 'application/json',
      body: Buffer.from(JSON.stringify(obj, null, 2))
    });
  }

  /**
   * Annotate the test with custom Allure labels. Useful for grouping.
   * e.g. AllureUtils.label(test.info(), 'feature', 'practice-form');
   */
  static label(info: TestInfo, labelName: string, value: string) {
    info.annotations.push({ type: labelName, description: value });
  }

  /**
   * Convenience wrapper for attaching a screenshot by path or buffer.
   */
  static attachScreenshot(info: TestInfo, name: string, buffer: Buffer) {
    info.attachments.push({
      name,
      contentType: 'image/png',
      body: buffer
    });
  }
}
