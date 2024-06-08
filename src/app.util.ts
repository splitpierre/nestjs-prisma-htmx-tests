import * as fs from 'fs';
import { join } from 'path';
import { ServerMode } from './app.types';
import { Response } from 'express';

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
      return (
        fs.statSync(filePath).isDirectory() &&
        file !== 'views' &&
        file !== 'api'
      );
    });
  // Creates array of all "views" path inside modules
  const views = modules.map((module) => {
    return join(__dirname, '..', 'src/', module, 'views');
  });
  // push base src/views to views array
  views.push(join(__dirname, '..', 'src/views'));
  return views;
}

function serverModeResponse(
  serverMode: ServerMode,
  res: Response,
  obj: any,
  view?: string,
) {
  if (serverMode === 'ssr' && view) {
    return res.render(view, obj);
  } else {
    return res.json(obj);
  }
}

export { getViewsPaths, serverModeResponse };
