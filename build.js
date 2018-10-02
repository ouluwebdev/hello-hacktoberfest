const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

fse.copySync("public", "build", {
  overwrite: true,
});

fse.copySync('src', 'build/src', {overwrite:true});

const filenames = fs.readdirSync("src");

const snippets = filenames.map((filename) => {
  const content = fs.readFileSync(path.join("src", filename), "utf-8");
  return `<pre data-src="./src/${filename}"></pre>`;
});

const INDEX_PATH = path.join(__dirname, "build", "index.html");
const INDEX_MARKER = "<!-- Generated with: npm run build -->";
const INDEX = fs.readFileSync(INDEX_PATH, "utf-8").split(INDEX_MARKER)[0];

const snippetsHTML = snippets.join("\n");

const newIndex = `${INDEX}${INDEX_MARKER}\n${snippetsHTML}<script src="./prism/prism.js"></script></body></html>`;

fs.writeFileSync(INDEX_PATH, newIndex, "utf-8");
console.log("Updated index.html with snippets:", snippetsHTML);
