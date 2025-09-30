import winston from "winston";

const transports = [];

if (process.env.NODE_ENV === "production") {
  // On Vercel → log to console (visible in Vercel dashboard)
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );
} else {
  // Local development → log to file
  transports.push(
    new winston.transports.File({ filename: "app.log" })
  );
}

const logger = winston.createLogger({
  level: "info",
  transports,
});

export default logger