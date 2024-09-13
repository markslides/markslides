import { linter, Diagnostic } from '@codemirror/lint';

const regExpForTableDivider = /(\|\s*-+\s*)+\|/g;
const regExpForWrongPageDivider = /---[\s|\S]+/g;

const lintExtension = linter(
    (view) => {
        const diagnostics: Diagnostic[] = [];

        // Linting divider
        for (let i = 1; i <= view.state.doc.lines; i++) {
            const line = view.state.doc.line(i);

            const isTableDivider = regExpForTableDivider.test(line.text);
            if (isTableDivider) {
                continue;
            }

            const matches = regExpForWrongPageDivider.exec(line.text);
            if (matches) {
                diagnostics.push({
                    from: line.from + matches.index,
                    to: line.from + matches.index + matches[0].length,
                    message: `Line ${i}: Invalid page divider. Please use it exactly in '---' form.`,
                    severity: 'warning',
                });
            }
        }

        return diagnostics;
    },
    {
        delay: 500,
    }
);

export default lintExtension;
