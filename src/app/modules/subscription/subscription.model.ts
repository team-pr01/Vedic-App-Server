import { Schema, model } from "mongoose";
import { TSubscription } from "./subscription.interface";

const SubscriptionSchema = new Schema<TSubscription>(
  {
    subscriptionPlanName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    senderAccountNumber: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = model<TSubscription>("Subscription", SubscriptionSchema);
export default Subscription;