const { execFileSync } = require("child_process");
const { existsSync } = require("fs");
const path = require("path");

module.exports = async (context) => {
  if (context.electronPlatformName !== "darwin") return;

  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(context.appOutDir, `${appName}.app`);

  if (existsSync(path.join(appPath, "Contents", "_CodeSignature"))) return;

  console.log("no code signing identity was used; falling back to ad-hoc signing.");
  execFileSync("codesign", ["--force", "--deep", "--sign", "-", appPath], { stdio: "inherit" });
  execFileSync("codesign", ["--verify", "--deep", "--strict", "--verbose=2", appPath], {
    stdio: "inherit"
  });
  console.log(
    "ad-hoc signed. 受け取り方によっては「開発元を確認できません」の警告が出る。" +
      "回避手順は README の「macOS 配布時のコード署名」を参照。"
  );
};
