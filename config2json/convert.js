const FS = require("fs")
const Path = require("path")
const Exe = require("child_process")

const Config = require("../config")

function run() {

    const config_path = Path.join(__dirname, "..", "..", "..", "..", "Player", "Axmol", "src", "common", "const", "const_game.lua")
    const LuaExe = Path.join(__dirname, "..", "lua", "lua54.exe")

    const tempPath = Path.join(__dirname, "temp")
    if (!FS.existsSync(tempPath)) {
        FS.mkdirSync(tempPath)
    }

    FS.copyFileSync(config_path, Path.join(tempPath, "const_game.lua"))

    Exe.execFileSync(LuaExe, ["-e require('./transform'); convert('.temp.const_game')"], { cwd: __dirname })

    const outputFile = Path.join(tempPath, "const_game.json")

    const destPath = Path.join(Config.creator_project_path, "assets", "resources", "config")
    if (!FS.existsSync(destPath)) {
        FS.mkdirSync(destPath, { recursive: true })
    }
    FS.copyFileSync(outputFile, Path.join(destPath, "const_game.json"))

    // copy / y "%config_path%" "%~dp0const_game.lua"

    //     % LuaExe % -e "require('./transform'); convert('.const_game')"

    // copy / y "%~dp0const_game.lua"
}

run()