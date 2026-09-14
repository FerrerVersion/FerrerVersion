const fs = require("fs");
const path = require("path");

module.exports = () => {
  const dir = path.join(__dirname, "..", "content", "projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const projects = files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
  return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
};
