import AppDataSource from "./data-source";
import app from "./app";
import monitoring from "./jobs/monitoringOpenAppointments";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then((res) => {
  console.log(`Database is running: ${res.isInitialized}`);

  monitoring.openAppointmentsAndNotificationDoctors();

  app.listen(PORT, () => {
    console.info(`App is running ind port ${PORT}!!!`);
  });
});
