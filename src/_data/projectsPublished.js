module.exports = async (data) => {
  const projects = await require("./projects.js")();
  return projects.filter((p) => !p.isPlaceholder);
};
