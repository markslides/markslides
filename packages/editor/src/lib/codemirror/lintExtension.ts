import { linter, Diagnostic } from '@codemirror/lint';

const regExpForLintingDivider = /---[\s|\S]+/g;

const lintExtension = linter(
    (view) => {
        const diagnostics: Diagnostic[] = [];

        // Linting divider
        for (let i = 1; i <= view.state.doc.lines; i++) {
            const line = view.state.doc.line(i);

            const matches = regExpForLintingDivider.exec(line.text);
            if (matches) {
                diagnostics.push({
                    from: line.from + matches.index,
                    to: line.from + matches.index + matches[0].length,
                    message: `Line ${i}: There are other characters after ‘---’`,
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
