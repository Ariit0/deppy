#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const parser = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).options({
    dir: { type: "string" },
    outDir: { type: "string", default: "./" },
    repo: { type: "string" },
    updatedBy: { type: "string" },
    teamLead: { type: "string" }
});
(async function () {
    const argv = await parser.argv;
    if (!argv.dir) {
        return console.log("Please provide the directory path to your dependency file.");
    }
    const obj = JSON.parse(fs_1.default.readFileSync(argv.dir, "utf-8"));
    let csv = "";
    const repo = argv.repo || "repo";
    const language = "JavaScript/TypeScript";
    const today = new Date();
    const lastUpdated = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;
    const updatedBy = argv.updatedBy || "user";
    const teamLead = argv.teamLead || "user";
    Object.keys(obj.dependencies).forEach((key) => {
        const version = obj.dependencies[key];
        csv += `${repo},${key},${language},${version},${lastUpdated},${updatedBy},${teamLead}\n`;
    });
    Object.keys(obj.devDependencies).forEach((key) => {
        const version = obj.devDependencies[key];
        csv += `${repo},${key},${language},${version},${lastUpdated},${updatedBy},${teamLead}\n`;
    });
    (0, fs_1.writeFileSync)(argv.outDir + "deplist.csv", csv);
})();
//# sourceMappingURL=index.js.map