const fs = require("fs");

const systemPrompt = fs.readFileSync("./prompts/system.md", "utf-8");
const userPrompt = fs.readFileSync("./prompts/user.md", "utf-8");

exports.system = systemPrompt;
exports.user = userPrompt;
  