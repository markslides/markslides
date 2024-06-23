import { type CSSProperties } from 'styled-components';

export function inlineRules(rulesObj: CSSProperties) {
    return Object.entries(rulesObj)
        .map(([property, value]) => `${property}: ${value};`)
        .join('');
}
