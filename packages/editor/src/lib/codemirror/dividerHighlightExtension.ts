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

function addClassnameToDividers(view: EditorView) {
    const builder = new RangeSetBuilder<Decoration>();

    for (let { from, to } of view.visibleRanges) {
        for (let pos = from; pos <= to; ) {
            const line = view.state.doc.lineAt(pos);

            const matches = regExpForPageDivider.exec(line.text);
            if (matches) {
                builder.add(
                    line.from,
                    line.from,
                    Decoration.line({
                        class: 'cm-page-divider',
                    })
                );
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
