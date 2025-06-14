export const routeAccessMap: Record<string, string[]> = {
  //   Content
  "/dashboard/content": [
    "/content/create-content", // POST
    "/content", // GET all
    "/content/:contentId", // GET one
    "/content/:contentId", // PUT
    "/content/delete-content/:contentId/:type/:url", // DELETE
  ],

  //   Emergencies
  "/dashboard/emergency": [
    "/emergency/send-message", // POST
    "/emergency", // GET (all)
    "/emergency/:emergencyId", // GET one
    "/emergency/:emergencyId", // PUT
    "/emergency/update-status/:emergencyId", // PUT
    "/emergency/:emergencyId", // DELETE
  ],

  // News
  "/dashboard/news": [
    "/news/add-news", // POST
    "/news", // GET all
    "/news/:newsId", // GET one
    "/news/:newsId", // PUT
    "/news/:newsId", // DELETE
  ],

  // Notification
  "/dashboard/notification": [
    "/notification/send-notification", // POST
    "/notification", // GET all
    "/notification/:notificationId", // GET one
    "/notification/:notificationId", // PUT
    "/notification/:notificationId", // DELETE
  ],

  // Organization
  "/dashboard/organization": [
    "/organization/add-organization", // POST
    "/organization", // GET all
    "/organization/:orgId", // GET one
    "/organization/:orgId", // PUT
    "/organization/:orgId", // DELETE
  ],

  //   Popup
  "/dashboard/popup": [
    "/popup/add-popup", // POST
    "/popup", // GET all
    "/popup/:popupId", // GET one
    "/popup/:popupId", // PUT
    "/popup/:popupId", // DELETE
  ],

  //   Reels
  "/dashboard/reels": [
    "/reels/add-reel", // POST
    "/reels", // GET all
    "/reels/:reelId", // GET one
    "/reels/:reelId", // PUT
    "/reels/:reelId", // DELETE
  ],

  // Religious Texts
  "/dashboard/religious-texts": [
    "/religiousTexts/add", // POST
    "/religiousTexts", // GET (all)
    "/religiousTexts/:id", // GET (by ID)
    "/religiousTexts/:id", // PUT (update)
    "/religiousTexts/:id", // DELETE (delete)
  ],

  // Temple
  "/dashboard/temple": [
    "/temple/add-temple", // POST
    "/temple/:templeId/events", // POST (add event to temple)
    "/temple/:templeId/events/:eventId", // DELETE (delete event from temple)
    "/temple", // GET all
    "/temple/:templeId", // GET one
    "/temple/:templeId", // PUT
    "/temple/:templeId", // DELETE
  ],

  // Vastu
  "/dashboard/vastu": [
    "/vastu/add-vastu", // POST
    "/vastu", // GET all
    "/vastu/:vastuId", // GET one
    "/vastu/:vastuId", // PUT
    "/vastu/:vastuId", // DELETE
  ],

  //   Yoga
  "/dashboard/yoga": [
    "/yoga/add-yoga", // POST
    "/yoga", // GET all
    "/yoga/:yogaId", // GET one
    "/yoga/:yogaId", // PUT
    "/yoga/:yogaId", // DELETE
  ],
};
