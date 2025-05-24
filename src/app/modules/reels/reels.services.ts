// Send emergency message by admin
const addReel = async (payload: TEmergencyMessageAdmin) => {
  const { title, message, severity, targetGroups } = payload;

  const payloadData = {
    title,
    message,
    severity,
    targetGroups
  };

  const result = await EmergencyMessageAdmin.create(payloadData);  

  return result;
};

export const ReelServices = {
  addReel,
};