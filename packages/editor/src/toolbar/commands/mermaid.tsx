import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { MermaidIcon } from '@/components/icons';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

const mermaid: ToolbarCommand = {
    name: 'mermaid',
    // keyCommand: 'mermaid',
    // button: { 'aria-label': 'Mermaid' },
    icon: <MermaidIcon size='24px' />,
    execute: (codeMirrorRef: ReactCodeMirrorRef) => {
        const { editor, state, view } = codeMirrorRef;

        if (!state || !view) {
            return;
        }

        // const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
        const lines = view.state.doc.iterRange(
            view.state.selection.main.from,
            view.state.selection.main.to
        );

        let selectedText = '';
        for (let line of lines) {
            selectedText += line;
        }

        const mark = '```mermaid';
        const sampleDiagram = `
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: Request
    Server->>Client: Response
        `.trim();
        // const matchMark = lineInfo.text.match(/^#+/);
        // if (matchMark && matchMark[0]) {
        //     const txt = matchMark[0];
        //     if (txt.length < 6) {
        //         mark = txt + '#';
        //     }
        // }
        // if (mark.length > 6) {
        //     mark = '#';
        // }
        // const title = lineInfo.text.replace(/^#+/, '');
        view.dispatch({
            changes: {
                from: view.state.selection.main.from,
                to: view.state.selection.main.to,
                insert: `
${mark}
${selectedText.length > 0 ? selectedText : sampleDiagram}
\`\`\`
        `.trim(),
            },
            // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
            // selection: { anchor: lineInfo.from + mark.length + 1 },
        });
    },
};

export default mermaid;
