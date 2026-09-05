// tools/copy-to-dev.js
// 「部署」的核心动作：把构建产物 public/ 拷贝到部署目录 dev/
// 跨平台（Windows / Linux / Mac 都能用），不依赖 cp / rm 命令。
// 注意：不能放在 scripts/ 目录，因为 Hexo 会把 scripts/ 当插件目录自动执行。
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "public");
const dest = path.join(root, "dev");

if (!fs.existsSync(src)) {
  console.error("❌ 找不到 public/ 目录，请先运行 npm run build 生成构建产物");
  process.exit(1);
}

// 每次部署前先清空旧的 dev/，保证部署的是最新版本
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });

console.log("✅ 部署完成: public/ -> dev/");
console.log("   访问 http://localhost:4000 查看（需先运行 npm run serve:dev）");
