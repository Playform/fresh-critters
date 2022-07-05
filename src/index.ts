import FastGlob from "fast-glob";
import fs from "fs";
import Options from "./options";

import Critters from "critters";

/**
 * It takes a settings object, creates a new Critters instance, and then parses all HTML files in the
 * given directory, passing each file's contents to the Critters instance
 * @param {Options} settings - Options
 */
const pipeAll = async (settings: Options) => {
	const critters = new Critters(settings);

	await parse(
		`${settings.path}**/*.html`,
		async (data) => await critters.process(data)
	);
};

/**
 * It takes a glob, a write function, and a read function, and then it parses all the files in the glob
 * with the write function, and then it writes the result to the file
 * @param {string} glob - The glob pattern to match files.
 * @param write - (data: string) => Promise<string> = async (data) => data,
 * @param read - (file: string) => Promise<string> = async (file) =>
 */
const parse = async (
	glob: string,
	write: (data: string) => Promise<string> = async (data) => data,
	read: (file: string) => Promise<string> = async (file) =>
		await fs.promises.readFile(file, "utf-8")
) => {
	const files = await FastGlob(glob);

	for (const file of files) {
		try {
			const writeBuffer = await write(await read(file));

			if (!writeBuffer) {
				continue;
			}

			await fs.promises.writeFile(file, writeBuffer, "utf-8");
		} catch (error) {
			console.log("Error: Cannot inline file " + file + " CSS!");
		}
	}
};
