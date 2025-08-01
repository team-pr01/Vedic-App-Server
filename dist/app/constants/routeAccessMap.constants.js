"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeAccessMap = void 0;
exports.routeAccessMap = {
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
    "/dashboard/notifications": [
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
    "/dashboard/popups": [
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
        // Category
        "/category/add-category", // POST
        "/category", // GET all
        "/category/:categoryId", // GET one
        "/category/:categoryId", // DELETE
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
    "/dashboard/temple-management": [
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
        "/yoga/:consultancyServiceId", // GET one
        "/yoga/:yogaId", // PUT
        "/yoga/:yogaId", // DELETE
    ],
    //   Conaultancy Service
    "/dashboard/consultancy-service": [
        "/consultancyService/add-consultancy-service", // POST
        "/consultancyService", // GET all
        "/consultancyService/:consultancyServiceId", // GET one
        "/consultancyService/:consultancyServiceId", // PUT
        "/consultancyService/:consultancyServiceId", // DELETE
    ],
    //   Api Keys
    "/dashboard/api-keys": [
        "/apiKeys/add", // POST
        "/apiKeys", // GET all
        "/apiKeys/:apiKeyId", // DELETE
    ],
    //   Course
    "/dashboard/course": [
        "/course/add-course", // POST
        "/course", // GET all
        "/course/:courseId", // GET one
        "/course/:courseId", // PUT
        "/course/:courseId", // DELETE
    ],
    //   Recipe
    "/dashboard/recipe": [
        "/recipe/add-recipe", // POST
        "/recipe", // GET all
        "/recipe/:courseId", // GET one
        "/recipe/:recipeId", // PUT
        "/recipe/:recipeId", // DELETE
    ],
};
