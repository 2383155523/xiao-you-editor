const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const execa = require("execa")
const pkg = require("../package.json")
const { prompt } = require("enquirer")

const currentVersion = pkg.version
const pkgName = pkg.name
const step = msg => console.log(chalk.cyan(msg))
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: "inherit", ...opts })

async function main() {
  const releaseType = await selectReleaseType()
  const targetVersion = await updateVersion(releaseType)
  await commitChanges(targetVersion)
  await publishPackagesToNpm(targetVersion).catch(error => {
    throw error
  })
  // await pushToGithub()
  await pushToGitee()
}

async function selectReleaseType() {
  const { releaseType } = await prompt({
    type: "select",
    name: "releaseType",
    message: "Select release type",
    choices: ["normal", "custom"],
  })
  return releaseType
}

async function getCustomVersion() {
  const { version } = await prompt({
    type: "input",
    name: "version",
    message: "Input custom version",
    initial: currentVersion,
  })
  return version
}

function generateNewVersion() {
  const versionNumberList = currentVersion.split(".")
  let firstNumber = versionNumberList[0]
  let secondNumber = versionNumberList[1]
  let thirdNumber = Number(versionNumberList[2]) + 1 + ""

  return `${firstNumber}.${secondNumber}.${thirdNumber}`
}

async function updateVersion(releaseType) {
  let targetVersion
  if (releaseType === "custom") {
    targetVersion = await getCustomVersion()
  } else if (releaseType === "normal") {
    targetVersion = generateNewVersion()
  }
  step("\nUpdating Version...")
  const pkgPath = path.resolve(path.resolve(__dirname, ".."), "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  pkg.version = targetVersion
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")
  // update pnpm-lock.yaml
  step("\nUpdating lockfile...")
  await run(`pnpm`, ["install", "--prefer-offline"])
  return targetVersion
}

async function getCommitMessage() {
  const { msg } = await prompt({
    type: "input",
    name: "msg",
    message: "Input Message For Current Commit",
  })
  return msg
}

async function commitChanges(targetVersion) {
  const { stdout } = await run("git", ["diff"], { stdio: "pipe" })
  if (stdout) {
    step("\nCommitting changes...")
    await run("git", ["add", "-A"])
    const msg = await getCommitMessage()
    await run("git", ["commit", "-m", `release: v${targetVersion},${msg}`])
  } else {
    console.log("No changes to commit.")
  }
}

async function pushToGithub(version) {
  step("\nPushing commit to Github...")
  await run("git", ["push", "github", `master`])
}
async function pushToGitee(version) {
  step("\nPushing commit to Gitee...")
  await run("git", ["push", "gitee", `master`])
}
async function publishPackagesToNpm(version) {
  step("\nPublishing packages to Npm...")
  try {
    await run("npm", ["publish"])
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (error) {
    throw error
  }
}

main().catch(error => console.error(error))
