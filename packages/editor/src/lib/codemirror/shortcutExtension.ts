import { Prec } from '@codemirror/state';
import { keymap } from '@uiw/react-codemirror';
import boldCommand from '@/lib/codemirror/command/boldCommand';
import italicCommand from '@/lib/codemirror/command/italicCommand';
import underlineCommand from '@/lib/codemirror/command/underlineCommand';
import newSlideCommand from '@/lib/codemirror/command/newSlideCommand';

const shortcutExtension = Prec.default(
    keymap.of([
        { key: 'Cmd-b', run: boldCommand },
        { key: 'Cmd-i', run: italicCommand },
        { key: 'Cmd-u', run: underlineCommand },
        { key: 'Cmd-Enter', run: newSlideCommand },
    ])
);

export default shortcutExtension;
