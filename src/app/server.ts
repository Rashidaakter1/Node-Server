import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  await mongoose.connect(config.database__url as string,);
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
    console.log(`conteced db`);
  });
}

main();
