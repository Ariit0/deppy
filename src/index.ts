#!/usr/bin/env node

import fs, { writeFileSync } from "fs";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

/**
 * Node Package JSON dependency structure
 */
interface PackageJson {
	dependencies: {
		[key: string]: string;
	};
	devDependencies: {
		[key: string]: string;
	};
	[key: string]: any;
}

/**
 * Parse arguments
 */
const parser = yargs(hideBin(process.argv)).options({
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

	const obj: PackageJson = JSON.parse(fs.readFileSync(argv.dir, "utf-8"));

	let csv = "";
	const repo = argv.repo || "repo";
	// TODO: Note that not necessarily every node_module is written in JavaScript/TypeScript. Could very well that the module is written in a completely different language but complied to web assembly
	const language = "JavaScript/TypeScript";
	const today = new Date();
	const lastUpdated = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
	const updatedBy = argv.updatedBy || "user";
	const teamLead = argv.teamLead || "user";
	/**
	 * Get Dependencies
	 */
	if (obj.dependencies) {
		Object.keys(obj.dependencies).forEach((key) => {
			// TODO: Allow for setup of csv columns - for now this is hard coded
			// TODO: Allow for setting of notes/comments on a per dep basis
			// Application/Repo	Module/Package	Language	Version Number	"Last Updated(YYYY/MM/DD)"	Updated By	Team Lead/Senior Dev	Comments/Notes
			const version = obj.dependencies[key];
			csv += `${repo},${key},${language},${version},${lastUpdated},${updatedBy},${teamLead}\n`;
		});
	}

	/**
	 * Get Dev Dependencies
	 */
	if (obj.devDependencies) {
		Object.keys(obj.devDependencies).forEach((key) => {
			const version = obj.devDependencies[key];
			csv += `${repo},${key},${language},${version},${lastUpdated},${updatedBy},${teamLead}\n`;
		});
	}

	writeFileSync(argv.outDir + "deplist.csv", csv);
})();
