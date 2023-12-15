import undo from '@/toolbar/commands/undo';
import redo from '@/toolbar/commands/redo';
import heading from '@/toolbar/commands/heading';
import bold from '@/toolbar/commands/bold';
import italic from '@/toolbar/commands/italic';
import strike from '@/toolbar/commands/strike';
import underline from '@/toolbar/commands/underline';
import blockQuotes from '@/toolbar/commands/blockQuotes';
import orderedList from '@/toolbar/commands/orderedList';
import unorderedList from '@/toolbar/commands/unorderedList';
import todoList from '@/toolbar/commands/todoList';
import link from '@/toolbar/commands/link';
import image from '@/toolbar/commands/image';
import code from '@/toolbar/commands/code';
import codeBlock from '@/toolbar/commands/codeBlock';
import mermaid from '@/toolbar/commands/mermaid';
import type { ToolbarCommand } from '@/toolbar/types/toolbar';

export {
    undo,
    redo,
    heading,
    bold,
    italic,
    strike,
    underline,
    blockQuotes,
    orderedList,
    unorderedList,
    todoList,
    link,
    image,
    code,
    codeBlock,
    mermaid,
};

export { ToolbarCommand };
