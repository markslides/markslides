import { Extension } from '@codemirror/state';
import { RangeSetBuilder } from '@codemirror/state';
import {
    EditorView,
    Decoration,
    ViewPlugin,
    DecorationSet,
    ViewUpdate,
} from '@codemirror/view';

const regExpForPageDivider = /^---$/g;
const regExpForFence = /^```/;

function addClassnameToDividers(view: EditorView) {
    const builder = new RangeSetBuilder<Decoration>();
    const doc = view.state.doc;

    // First, scan the entire document to identify fence ranges
    const fenceRanges: { from: number; to: number }[] = [];
    let fenceStart = -1;

    for (let lineNum = 1; lineNum <= doc.lines; lineNum++) {
        const line = doc.line(lineNum);
        const lineText = line.text;

        if (regExpForFence.test(lineText)) {
            if (fenceStart === -1) {
                // Starting a new fence
                fenceStart = line.from;
            } else {
                // Ending current fence
                fenceRanges.push({
                    from: fenceStart,
                    to: line.to,
                });
                fenceStart = -1;
            }
        }
    }

    // Helper function to check if a position is inside any fence
    const isInsideFence = (pos: number): boolean => {
        return fenceRanges.some(
            (range) => pos >= range.from && pos <= range.to
        );
    };

    // Now process visible ranges and apply decorations
    for (let { from, to } of view.visibleRanges) {
        for (let pos = from; pos <= to; ) {
            const line = view.state.doc.lineAt(pos);
            const lineText = line.text;

            // Only apply divider highlighting if we're not inside a fence
            if (!isInsideFence(line.from)) {
                const matches = regExpForPageDivider.exec(lineText);
                if (matches) {
                    builder.add(
                        line.from,
                        line.from,
                        Decoration.line({
                            class: 'cm-page-divider',
                        })
                    );
                }
            }

            pos = line.to + 1;
        }
    }

    return builder.finish();
}

const dividerHighlightExtension: Extension = ViewPlugin.fromClass(
    class {
        decorations: DecorationSet;
        constructor(view: EditorView) {
            this.decorations = addClassnameToDividers(view);
        }
        update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged) {
                this.decorations = addClassnameToDividers(update.view);
            }
        }
    },
    {
        decorations: (value) => value.decorations,
    }
);

export default dividerHighlightExtension;
