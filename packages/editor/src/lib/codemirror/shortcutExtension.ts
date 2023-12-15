import { Prec } from '@codemirror/state';
import { keymap } from '@uiw/react-codemirror';
import newSlideCommand from '@/lib/codemirror/command/newSlideCommand';

const shortcutExtension = Prec.highest(
    keymap.of([
        { key: 'Cmd-Enter', run: newSlideCommand },
    ])
);

export default shortcutExtension;
