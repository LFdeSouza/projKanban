import "dotenv/config";
import { default as mongoose } from "mongoose";

mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () => console.log(`Mongoose connected...`));
mongoose.connection.on("disconnect", () =>
  console.log(`Mongoose disconnected...`)
);
mongoose.connection.on("error", (err) =>
  console.log(`Mongoose connection failed: ${err}`)
);

const mongooseShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

//Nodemon
process.once("SIGUSR2", () => {
  mongooseShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
//Application termination
process.on("SIGINT", () => {
  mongooseShutdown("app termination", () => {
    process.exit(0);
  });
});
//Heroku
process.on("SIGTERM", () => {
  mongooseShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});
