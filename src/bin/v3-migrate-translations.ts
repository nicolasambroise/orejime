#!/usr/bin/env node

import {parse, stringify} from 'yaml';
import fs from 'fs';
import path from 'path';
import {migrateTranslations} from '../migrations/v3/translations';

const args = process.argv.slice(2);

if (!args.length) {
	throw new Error('Please provide the path to the translations folder.');
}

const dir = args[0];

fs.readdirSync(dir)
	.filter((file) => path.extname(file) === '.yml')
	.map((file) => {
		const filePath = path.resolve(dir, file);
		const contents = fs.readFileSync(filePath, 'utf-8');
		const translations = parse(contents);
		const updated = migrateTranslations(translations);

		fs.writeFileSync(filePath, stringify(updated), 'utf-8');
	});
