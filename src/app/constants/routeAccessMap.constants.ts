export const routeAccessMap: Record<string, string[]> = {
  '/dashboard/religious-texts': [
    '/religiousTexts/add',         // POST
    '/religiousTexts',             // GET (all)
    '/religiousTexts/:id',         // GET (by ID)
    '/religiousTexts/:id',         // PUT (update)
    '/religiousTexts/:id',         // DELETE (delete)
  ],
};
