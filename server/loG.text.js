import "dotenv/config";

export const logText = () => {
  console.log(`[${new Date().toISOString()}]`.cyan.italic);
  console.log();

  console.log(`[** EXPRESS SERVER **]`.yellow.underline.bold);
  console.log("|                    |".underline.bgMagenta);
  console.log(
    ".".bgMagenta,
    "  ZALENDO VOTING".cyan.bold.italic,
    " ",
    ".".bgMagenta
  );
  console.log(
    ".".bgMagenta,
    "    SYSTEM API".cyan.bold.italic,
    "   ",
    ".".bgMagenta
  );
  console.log("|                    |".underline.bgMagenta);
  console.log();
  console.log(
    `-----🚀 Server running on --> `,
    process.env.NODE_ENV === "production"
      ? process.env.productiontUrl.blue.underline
      : `http://localhost:${process.env.port}/`.blue.underline
  );
  console.log("✅ Database connected successfully".green);
};
