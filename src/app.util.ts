import * as fs from 'fs';
import { join } from 'path';

/**
 * Get all views paths from modules
 * @returns {string[]} - Array of views paths
 */
function getViewsPaths(): string[] {
  // Read src folder, and creates a list
  const modules = fs
    .readdirSync(join(__dirname, '..', 'src/'))
    .filter((file) => {
      const filePath = join(__dirname, '..', 'src/', file);
      return fs.statSync(filePath).isDirectory() && file !== 'views';
    });
  // Creates array of all "views" path inside modules
  const views = modules.map((module) => {
    return join(__dirname, '..', 'src/', module, 'views');
  });
  // push base src/views to views array
  views.push(join(__dirname, '..', 'src/views'));
  return views;
}

export { getViewsPaths };
