import { EditorView } from '@codemirror/view';

export default EditorView.domEventHandlers({
    keydown(event, view) {
        // Handle regular character input in overwrite mode
        if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
        ) {
            const { state } = view;
            const { from, to } = state.selection.main;

            // If it's a selection, let default behavior handle it
            if (from !== to) {
                return false;
            }

            // In overwrite mode, select the next character if it exists
            const nextChar = from + 1;
            if (nextChar <= state.doc.length) {
                const char = state.doc.sliceString(from, nextChar);
                // Don't overwrite newlines
                if (char !== '\n') {
                    view.dispatch({
                        selection: { anchor: from, head: nextChar },
                    });
                }
            }
        }

        return false;
    },
});
