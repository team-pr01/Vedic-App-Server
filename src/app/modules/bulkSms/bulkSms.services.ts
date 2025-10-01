/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { sendEmail } from "../../utils/sendEmail";

interface BulkEmailPayload {
  targetedAudience: "all" | "active" | "inactive";
  subject: string;
  message: string;
}

const sendBulkEmail = async (payload: BulkEmailPayload) => {
  try {
    const { targetedAudience, subject, message } = payload;

    let users;

    const now = new Date();
    const days30Ago = new Date(now);
    days30Ago.setDate(now.getDate() - 30);

    if (targetedAudience === "all") {
      users = await User.find({});
    } else if (targetedAudience === "active") {
      users = await User.find({
        lastLoggedIn: { $gte: days30Ago },
      });
    } else if (targetedAudience === "inactive") {
      users = await User.find({
        $or: [
          { lastLoggedIn: { $lt: days30Ago } },
          { lastLoggedIn: { $exists: false } },
        ],
      });
    }

    if (!users || users.length === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "No users found for this audience"
      );
    }

    const batchSize = 50;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      await Promise.all(
        batch.map((user) => sendEmail(user.email, message, subject))
      );
    }

    return {
      success: true,
      message: `Bulk email sent to ${users.length} users successfully`,
    };
  } catch (error: any) {
    console.error("Bulk email error:", error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to send bulk email"
    );
  }
};

export const BulkSmsServices = {
  sendBulkEmail,
};
