import { Project, SyntaxKind } from "ts-morph";
import fs from "fs";
import path from "path";
import process from "process";

const project = new Project();
const root = process.cwd();

project.addSourceFilesAtPaths(path.join(root, "src/**/*.tsx"));

const sourceFiles = project.getSourceFiles();

const outputDir = path.join(root, "docs/components");
fs.mkdirSync(outputDir, { recursive: true });

const componentNames: string[] = [];

sourceFiles.forEach((file) => {
	const exports = file.getExportedDeclarations();

	exports.forEach((decls, name) => {
		decls.forEach((decl) => {
			if (
				decl.getKind() !== SyntaxKind.FunctionDeclaration &&
				decl.getKind() !== SyntaxKind.VariableDeclaration
			)
				return;

			const componentName =
				name === "default" ? file.getBaseNameWithoutExtension() : name;

			const type = decl.getType().getText();

			fs.writeFileSync(
				path.join(outputDir, `${componentName}.md`),
				`# ${componentName}\n\n\`\`\`ts\n${type}\n\`\`\``,
			);

			if (!componentNames.includes(componentName)) {
				componentNames.push(componentName);
			}
		});
	});
});

fs.writeFileSync(
	path.join(outputDir, "index.md"),
	`# Components\n\n${componentNames
		.map((n) => `- [${n}](./${n}.md)`)
		.join("\n")}`,
);
