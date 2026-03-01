// utils/DataLoader.ts
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export class DataLoader {
  // Load JSON (Best for Login/User objects)
  static getJsonData(fileName: string) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${fileName}`), 'utf-8'));
  }

  // Load CSV (Best for Zodiac combinations)
  static getCsvData(fileName: string) {
    const fileContent = fs.readFileSync(path.join(__dirname, `../data/${fileName}`), 'utf-8');
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
  }
}
