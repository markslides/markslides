import { css } from 'styled-components';

const theme = css`
    /*
     * Marp default theme.
     *
     * @theme default
     * @author Yuki Hattori
     *
     * @auto-scaling true
     * @size 16:9 1280px 720px
     * @size 4:3 960px 720px
     */
    section {
        --color-prettylights-syntax-comment: #6e7781;
        --color-prettylights-syntax-constant: #0550ae;
        --color-prettylights-syntax-entity: #8250df;
        --color-prettylights-syntax-storage-modifier-import: #24292f;
        --color-prettylights-syntax-entity-tag: #116329;
        --color-prettylights-syntax-keyword: #cf222e;
        --color-prettylights-syntax-string: #0a3069;
        --color-prettylights-syntax-variable: #953800;
        --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
        --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
        --color-prettylights-syntax-invalid-illegal-bg: #82071e;
        --color-prettylights-syntax-carriage-return-text: #f6f8fa;
        --color-prettylights-syntax-carriage-return-bg: #cf222e;
        --color-prettylights-syntax-string-regexp: #116329;
        --color-prettylights-syntax-markup-list: #3b2300;
        --color-prettylights-syntax-markup-heading: #0550ae;
        --color-prettylights-syntax-markup-italic: #24292f;
        --color-prettylights-syntax-markup-bold: #24292f;
        --color-prettylights-syntax-markup-deleted-text: #82071e;
        --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
        --color-prettylights-syntax-markup-inserted-text: #116329;
        --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
        --color-prettylights-syntax-markup-changed-text: #953800;
        --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
        --color-prettylights-syntax-markup-ignored-text: #eaeef2;
        --color-prettylights-syntax-markup-ignored-bg: #0550ae;
        --color-prettylights-syntax-meta-diff-range: #8250df;
        --color-prettylights-syntax-brackethighlighter-angle: #57606a;
        --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
        --color-prettylights-syntax-constant-other-reference-link: #0a3069;
        --color-fg-default: #24292f;
        --color-fg-muted: #57606a;
        --color-fg-subtle: #6e7781;
        --color-canvas-default: #fff;
        --color-canvas-subtle: #f6f8fa;
        --color-border-default: #d0d7de;
        --color-border-muted: #d8dee4;
        --color-neutral-muted: rgba(175, 184, 193, 0.2);
        --color-accent-fg: #0969da;
        --color-accent-emphasis: #0969da;
        --color-attention-subtle: #fff8c5;
        --color-danger-fg: #cf222e;
        color-scheme: light;
    }

    section:where(.invert) {
        --color-prettylights-syntax-comment: #8b949e;
        --color-prettylights-syntax-constant: #79c0ff;
        --color-prettylights-syntax-entity: #d2a8ff;
        --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
        --color-prettylights-syntax-entity-tag: #7ee787;
        --color-prettylights-syntax-keyword: #ff7b72;
        --color-prettylights-syntax-string: #a5d6ff;
        --color-prettylights-syntax-variable: #ffa657;
        --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
        --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
        --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
        --color-prettylights-syntax-carriage-return-text: #f0f6fc;
        --color-prettylights-syntax-carriage-return-bg: #b62324;
        --color-prettylights-syntax-string-regexp: #7ee787;
        --color-prettylights-syntax-markup-list: #f2cc60;
        --color-prettylights-syntax-markup-heading: #1f6feb;
        --color-prettylights-syntax-markup-italic: #c9d1d9;
        --color-prettylights-syntax-markup-bold: #c9d1d9;
        --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
        --color-prettylights-syntax-markup-deleted-bg: #67060c;
        --color-prettylights-syntax-markup-inserted-text: #aff5b4;
        --color-prettylights-syntax-markup-inserted-bg: #033a16;
        --color-prettylights-syntax-markup-changed-text: #ffdfb6;
        --color-prettylights-syntax-markup-changed-bg: #5a1e02;
        --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
        --color-prettylights-syntax-markup-ignored-bg: #1158c7;
        --color-prettylights-syntax-meta-diff-range: #d2a8ff;
        --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
        --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
        --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
        --color-fg-default: #c9d1d9;
        --color-fg-muted: #8b949e;
        --color-fg-subtle: #6e7681;
        --color-canvas-default: #0d1117;
        --color-canvas-subtle: #161b22;
        --color-border-default: #30363d;
        --color-border-muted: #21262d;
        --color-neutral-muted: hsla(215, 8%, 47%, 0.4);
        --color-accent-fg: #58a6ff;
        --color-accent-emphasis: #1f6feb;
        --color-attention-subtle: rgba(187, 128, 9, 0.15);
        --color-danger-fg: #f85149;
        color-scheme: dark;
    }

    section {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        word-wrap: break-word;
        background-color: var(--color-canvas-default);
        color: var(--color-fg-default);
        font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Noto Sans,
            Helvetica,
            Arial,
            sans-serif,
            Apple Color Emoji,
            Segoe UI Emoji;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;

        /* Hide scrollbar */
        /* Chrome, Safari and Opera */
        ::-webkit-scrollbar {
            display: none;
        }

        /* IE and Edge */
        -ms-overflow-style: none;
        /* Firefox */
        scrollbar-width: none;
    }

    section h1:hover .anchor .octicon-link:before,
    section h2:hover .anchor .octicon-link:before,
    section h3:hover .anchor .octicon-link:before,
    section h4:hover .anchor .octicon-link:before,
    section h5:hover .anchor .octicon-link:before,
    section h6:hover .anchor .octicon-link:before {
        background-color: currentColor;
        content: \" \";
        display: inline-block;
        height: 16px;
        -webkit-mask-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"/></svg>');
        mask-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"/></svg>');
        width: 16px;
    }

    section details,
    section figcaption,
    section figure {
        display: block;
    }

    section summary {
        display: list-item;
    }

    section [hidden] {
        display: none !important;
    }

    section a {
        background-color: transparent;
        color: var(--color-accent-fg);
        text-decoration: none;
    }

    section abbr[title] {
        border-bottom: none;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
    }

    section b,
    section strong {
        font-weight: var(--base-text-weight-semibold, 600);
    }

    section dfn {
        font-style: italic;
    }

    section h1 {
        border-bottom: 1px solid var(--color-border-muted);
        font-size: 2em;
        font-weight: var(--base-text-weight-semibold, 600);
        margin: 0.67em 0;
        padding-bottom: 0.3em;
    }

    section mark {
        background-color: var(--color-attention-subtle);
        color: var(--color-fg-default);
    }

    section small {
        font-size: 90%;
    }

    section sub,
    section sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    section sub {
        bottom: -0.25em;
    }

    section sup {
        top: -0.5em;
    }

    section img {
        background-color: var(--color-canvas-default);
        border-style: none;
        box-sizing: content-box;
        max-width: 100%;
    }

    section code,
    section kbd,
    section pre,
    section samp {
        font-family: monospace;
        font-size: 1em;
    }

    section figure {
        margin: 1em 40px;
    }

    section hr {
        background: transparent;
        background-color: var(--color-border-default);
        border: 0;
        box-sizing: content-box;
        height: 0.25em;
        margin: 24px 0;
        overflow: hidden;
        padding: 0;
    }

    section input {
        font: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        margin: 0;
        overflow: visible;
    }

    section [type='button'],
    section [type='reset'],
    section [type='submit'] {
        -webkit-appearance: button;
    }

    section [type='checkbox'],
    section [type='radio'] {
        box-sizing: border-box;
        padding: 0;
    }

    section [type='number']::-webkit-inner-spin-button,
    section [type='number']::-webkit-outer-spin-button {
        height: auto;
    }

    section [type='search']::-webkit-search-cancel-button,
    section [type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    section ::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.54;
    }

    section ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }

    section a:hover {
        text-decoration: underline;
    }

    section ::-moz-placeholder {
        color: var(--color-fg-subtle);
        opacity: 1;
    }

    section ::placeholder {
        color: var(--color-fg-subtle);
        opacity: 1;
    }

    section hr::after,
    section hr::before {
        content: '';
        display: table;
    }

    section hr::after {
        clear: both;
    }

    section table {
        border-collapse: collapse;
        border-spacing: 0;
        display: block;
        max-width: 100%;
        overflow: auto;
        width: -moz-max-content;
        width: max-content;
    }

    section td,
    section th {
        padding: 0;
    }

    section details summary {
        cursor: pointer;
    }

    section details:not([open]) > *:not(summary) {
        display: none !important;
    }

    section [role='button']:focus,
    section a:focus,
    section input[type='checkbox']:focus,
    section input[type='radio']:focus {
        box-shadow: none;
        outline: 2px solid var(--color-accent-fg);
        outline-offset: -2px;
    }

    section [role='button']:focus:not(:focus-visible),
    section a:focus:not(:focus-visible),
    section input[type='checkbox']:focus:not(:focus-visible),
    section input[type='radio']:focus:not(:focus-visible) {
        outline: 1px solid transparent;
    }

    section [role='button']:focus-visible,
    section a:focus-visible,
    section input[type='checkbox']:focus-visible,
    section input[type='radio']:focus-visible {
        box-shadow: none;
        outline: 2px solid var(--color-accent-fg);
        outline-offset: -2px;
    }

    section a:not([class]):focus,
    section a:not([class]):focus-visible,
    section input[type='checkbox']:focus,
    section input[type='checkbox']:focus-visible,
    section input[type='radio']:focus,
    section input[type='radio']:focus-visible {
        outline-offset: 0;
    }

    section kbd {
        background-color: var(--color-canvas-subtle);
        border-bottom-color: var(--color-neutral-muted);
        border: 1px solid var(--color-neutral-muted);
        border-radius: 6px;
        box-shadow: inset 0 -1px 0 var(--color-neutral-muted);
        color: var(--color-fg-default);
        display: inline-block;
        font:
            11px ui-monospace,
            SFMono-Regular,
            SF Mono,
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        line-height: 10px;
        padding: 3px 5px;
        vertical-align: middle;
    }

    section h1,
    section h2,
    section h3,
    section h4,
    section h5,
    section h6 {
        font-weight: var(--base-text-weight-semibold, 600);
        line-height: 1.25;
        margin-bottom: 16px;
        margin-top: 24px;
    }

    section h2 {
        border-bottom: 1px solid var(--color-border-muted);
        font-size: 1.5em;
        padding-bottom: 0.3em;
    }

    section h2,
    section h3 {
        font-weight: var(--base-text-weight-semibold, 600);
    }

    section h3 {
        font-size: 1.25em;
    }

    section h4 {
        font-size: 1em;
    }

    section h4,
    section h5 {
        font-weight: var(--base-text-weight-semibold, 600);
    }

    section h5 {
        font-size: 0.875em;
    }

    section h6 {
        color: var(--color-fg-muted);
        font-size: 0.85em;
        font-weight: var(--base-text-weight-semibold, 600);
    }

    section p {
        margin-bottom: 10px;
        margin-top: 0;
    }

    section blockquote {
        border-left: 0.25em solid var(--color-border-default);
        color: var(--color-fg-muted);
        margin: 0;
        padding: 0 1em;
    }

    section ol,
    section ul {
        margin-bottom: 0;
        margin-top: 0;
        padding-left: 2em;
    }

    section ol ol,
    section ul ol {
        list-style-type: lower-roman;
    }

    section ol ol ol,
    section ol ul ol,
    section ul ol ol,
    section ul ul ol {
        list-style-type: lower-alpha;
    }

    section dd {
        margin-left: 0;
    }

    section code,
    section pre,
    section samp,
    section tt {
        font-family:
            ui-monospace,
            SFMono-Regular,
            SF Mono,
            Menlo,
            Consolas,
            Liberation Mono,
            monospace;
        font-size: 12px;
    }

    section pre {
        word-wrap: normal;
        margin-bottom: 0;
        margin-top: 0;
    }

    section .octicon {
        fill: currentColor;
        display: inline-block;
        overflow: visible !important;
        vertical-align: text-bottom;
    }

    section input::-webkit-inner-spin-button,
    section input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }

    section::after,
    section::before {
        content: '';
        display: table;
    }

    section::after {
        clear: both;
    }

    section > *:first-child {
        margin-top: 0 !important;
    }

    section > *:last-child {
        margin-bottom: 0 !important;
    }

    section a:not([href]) {
        color: inherit;
        text-decoration: none;
    }

    section .absent {
        color: var(--color-danger-fg);
    }

    section .anchor {
        float: left;
        line-height: 1;
        margin-left: -20px;
        padding-right: 4px;
    }

    section .anchor:focus {
        outline: none;
    }

    section blockquote,
    section details,
    section dl,
    section ol,
    section p,
    section pre,
    section table,
    section ul {
        margin-bottom: 16px;
        margin-top: 0;
    }

    section blockquote > :first-child {
        margin-top: 0;
    }

    section blockquote > :last-child {
        margin-bottom: 0;
    }

    section h1 .octicon-link,
    section h2 .octicon-link,
    section h3 .octicon-link,
    section h4 .octicon-link,
    section h5 .octicon-link,
    section h6 .octicon-link {
        color: var(--color-fg-default);
        vertical-align: middle;
        visibility: hidden;
    }

    section h1:hover .anchor,
    section h2:hover .anchor,
    section h3:hover .anchor,
    section h4:hover .anchor,
    section h5:hover .anchor,
    section h6:hover .anchor {
        text-decoration: none;
    }

    section h1:hover .anchor .octicon-link,
    section h2:hover .anchor .octicon-link,
    section h3:hover .anchor .octicon-link,
    section h4:hover .anchor .octicon-link,
    section h5:hover .anchor .octicon-link,
    section h6:hover .anchor .octicon-link {
        visibility: visible;
    }

    section h1 code,
    section h1 tt,
    section h2 code,
    section h2 tt,
    section h3 code,
    section h3 tt,
    section h4 code,
    section h4 tt,
    section h5 code,
    section h5 tt,
    section h6 code,
    section h6 tt {
        font-size: inherit;
        padding: 0 0.2em;
    }

    section summary h1,
    section summary h2,
    section summary h3,
    section summary h4,
    section summary h5,
    section summary h6 {
        display: inline-block;
    }

    section summary h1 .anchor,
    section summary h2 .anchor,
    section summary h3 .anchor,
    section summary h4 .anchor,
    section summary h5 .anchor,
    section summary h6 .anchor {
        margin-left: -40px;
    }

    section summary h1,
    section summary h2 {
        border-bottom: 0;
        padding-bottom: 0;
    }

    section ol.no-list,
    section ul.no-list {
        list-style-type: none;
        padding: 0;
    }

    section ol[type='a'] {
        list-style-type: lower-alpha;
    }

    section ol[type='A'] {
        list-style-type: upper-alpha;
    }

    section ol[type='i'] {
        list-style-type: lower-roman;
    }

    section ol[type='I'] {
        list-style-type: upper-roman;
    }

    section div > ol:not([type]),
    section ol[type=\"1\"] {
        list-style-type: decimal;
    }

    section ol ol,
    section ol ul,
    section ul ol,
    section ul ul {
        margin-bottom: 0;
        margin-top: 0;
    }

    section li > p {
        margin-top: 16px;
    }

    section li + li {
        margin-top: 0.25em;
    }

    section dl {
        padding: 0;
    }

    section dl dt {
        font-size: 1em;
        font-style: italic;
        font-weight: var(--base-text-weight-semibold, 600);
        margin-top: 16px;
        padding: 0;
    }

    section dl dd {
        margin-bottom: 16px;
        padding: 0 16px;
    }

    section table th {
        font-weight: var(--base-text-weight-semibold, 600);
    }

    section table td,
    section table th {
        border: 1px solid var(--color-border-default);
        padding: 6px 13px;
    }

    section table tr {
        background-color: var(--color-canvas-default);
        border-top: 1px solid var(--color-border-muted);
    }

    section table tr:nth-child(2n) {
        background-color: var(--color-canvas-subtle);
    }

    section table img {
        background-color: transparent;
    }

    section img[align='right'] {
        padding-left: 20px;
    }

    section img[align='left'] {
        padding-right: 20px;
    }

    section .emoji {
        background-color: transparent;
        max-width: none;
        vertical-align: text-top;
    }

    section span.frame,
    section span.frame > span {
        display: block;
        overflow: hidden;
    }

    section span.frame > span {
        border: 1px solid var(--color-border-default);
        float: left;
        margin: 13px 0 0;
        padding: 7px;
        width: auto;
    }

    section span.frame span img {
        display: block;
        float: left;
    }

    section span.frame span span {
        clear: both;
        color: var(--color-fg-default);
        display: block;
        padding: 5px 0 0;
    }

    section span.align-center {
        clear: both;
        display: block;
        overflow: hidden;
    }

    section span.align-center > span {
        display: block;
        margin: 13px auto 0;
        overflow: hidden;
        text-align: center;
    }

    section span.align-center span img {
        margin: 0 auto;
        text-align: center;
    }

    section span.align-right {
        clear: both;
        display: block;
        overflow: hidden;
    }

    section span.align-right > span {
        display: block;
        margin: 13px 0 0;
        overflow: hidden;
        text-align: right;
    }

    section span.align-right span img {
        margin: 0;
        text-align: right;
    }

    section span.float-left {
        display: block;
        float: left;
        margin-right: 13px;
        overflow: hidden;
    }

    section span.float-left span {
        margin: 13px 0 0;
    }

    section span.float-right {
        display: block;
        float: right;
        margin-left: 13px;
        overflow: hidden;
    }

    section span.float-right > span {
        display: block;
        margin: 13px auto 0;
        overflow: hidden;
        text-align: right;
    }

    section code,
    section tt {
        background-color: var(--color-neutral-muted);
        border-radius: 6px;
        font-size: 85%;
        margin: 0;
        padding: 0.2em 0.4em;
        white-space: break-spaces;
    }

    section code br,
    section tt br {
        display: none;
    }

    section del code {
        text-decoration: inherit;
    }

    section samp {
        font-size: 85%;
    }

    section pre code {
        font-size: 100%;
    }

    section pre > code {
        background: transparent;
        border: 0;
        margin: 0;
        padding: 0;
        white-space: pre;
        word-break: normal;
    }

    section .highlight {
        margin-bottom: 16px;
    }

    section .highlight pre {
        margin-bottom: 0;
        word-break: normal;
    }

    section pre {
        background-color: var(--color-canvas-subtle);
        border-radius: 6px;
        font-size: 85%;
        line-height: 1.45;
        overflow: auto;
        padding: 16px;
    }

    section pre code,
    section pre tt {
        word-wrap: normal;
        background-color: transparent;
        border: 0;
        display: inline;
        line-height: inherit;
        margin: 0;
        max-width: auto;
        overflow: visible;
        padding: 0;
    }

    section .csv-data td,
    section .csv-data th {
        font-size: 12px;
        line-height: 1;
        overflow: hidden;
        padding: 5px;
        text-align: left;
        white-space: nowrap;
    }

    section .csv-data .blob-num {
        background: var(--color-canvas-default);
        border: 0;
        padding: 10px 8px 9px;
        text-align: right;
    }

    section .csv-data tr {
        border-top: 0;
    }

    section .csv-data th {
        background: var(--color-canvas-subtle);
        border-top: 0;
        font-weight: var(--base-text-weight-semibold, 600);
    }

    section [data-footnote-ref]::before {
        content: '[';
    }

    section [data-footnote-ref]::after {
        content: ']';
    }

    section .footnotes {
        border-top: 1px solid var(--color-border-default);
        color: var(--color-fg-muted);
        font-size: 12px;
    }

    section .footnotes ol {
        padding-left: 16px;
    }

    section .footnotes ol ul {
        display: inline-block;
        margin-top: 16px;
        padding-left: 16px;
    }

    section .footnotes li {
        position: relative;
    }

    section .footnotes li:target::before {
        border: 2px solid var(--color-accent-emphasis);
        border-radius: 6px;
        bottom: -8px;
        content: '';
        left: -24px;
        pointer-events: none;
        position: absolute;
        right: -8px;
        top: -8px;
    }

    section .footnotes li:target {
        color: var(--color-fg-default);
    }

    section .footnotes .data-footnote-backref g-emoji {
        font-family: monospace;
    }

    section .pl-c {
        color: var(--color-prettylights-syntax-comment);
    }

    section .pl-c1,
    section .pl-s .pl-v {
        color: var(--color-prettylights-syntax-constant);
    }

    section .pl-e,
    section .pl-en {
        color: var(--color-prettylights-syntax-entity);
    }

    section .pl-s .pl-s1,
    section .pl-smi {
        color: var(--color-prettylights-syntax-storage-modifier-import);
    }

    section .pl-ent {
        color: var(--color-prettylights-syntax-entity-tag);
    }

    section .pl-k {
        color: var(--color-prettylights-syntax-keyword);
    }

    section .pl-pds,
    section .pl-s,
    section .pl-s .pl-pse .pl-s1,
    section .pl-sr,
    section .pl-sr .pl-cce,
    section .pl-sr .pl-sra,
    section .pl-sr .pl-sre {
        color: var(--color-prettylights-syntax-string);
    }

    section .pl-smw,
    section .pl-v {
        color: var(--color-prettylights-syntax-variable);
    }

    section .pl-bu {
        color: var(--color-prettylights-syntax-brackethighlighter-unmatched);
    }

    section .pl-ii {
        background-color: var(--color-prettylights-syntax-invalid-illegal-bg);
        color: var(--color-prettylights-syntax-invalid-illegal-text);
    }

    section .pl-c2 {
        background-color: var(--color-prettylights-syntax-carriage-return-bg);
        color: var(--color-prettylights-syntax-carriage-return-text);
    }

    section .pl-sr .pl-cce {
        color: var(--color-prettylights-syntax-string-regexp);
        font-weight: 700;
    }

    section .pl-ml {
        color: var(--color-prettylights-syntax-markup-list);
    }

    section .pl-mh,
    section .pl-mh .pl-en,
    section .pl-ms {
        color: var(--color-prettylights-syntax-markup-heading);
        font-weight: 700;
    }

    section .pl-mi {
        color: var(--color-prettylights-syntax-markup-italic);
        font-style: italic;
    }

    section .pl-mb {
        color: var(--color-prettylights-syntax-markup-bold);
        font-weight: 700;
    }

    section .pl-md {
        background-color: var(--color-prettylights-syntax-markup-deleted-bg);
        color: var(--color-prettylights-syntax-markup-deleted-text);
    }

    section .pl-mi1 {
        background-color: var(--color-prettylights-syntax-markup-inserted-bg);
        color: var(--color-prettylights-syntax-markup-inserted-text);
    }

    section .pl-mc {
        background-color: var(--color-prettylights-syntax-markup-changed-bg);
        color: var(--color-prettylights-syntax-markup-changed-text);
    }

    section .pl-mi2 {
        background-color: var(--color-prettylights-syntax-markup-ignored-bg);
        color: var(--color-prettylights-syntax-markup-ignored-text);
    }

    section .pl-mdr {
        color: var(--color-prettylights-syntax-meta-diff-range);
        font-weight: 700;
    }

    section .pl-ba {
        color: var(--color-prettylights-syntax-brackethighlighter-angle);
    }

    section .pl-sg {
        color: var(--color-prettylights-syntax-sublimelinter-gutter-mark);
    }

    section .pl-corl {
        color: var(--color-prettylights-syntax-constant-other-reference-link);
        text-decoration: underline;
    }

    section g-emoji {
        display: inline-block;
        font-family:
            Apple Color Emoji,
            Segoe UI Emoji,
            Segoe UI Symbol;
        font-size: 1em;
        font-style: normal !important;
        font-weight: var(--base-text-weight-normal, 400);
        line-height: 1;
        min-width: 1ch;
        vertical-align: -0.075em;
    }

    section g-emoji img {
        height: 1em;
        width: 1em;
    }

    section .task-list-item {
        list-style-type: none;
    }

    section .task-list-item label {
        font-weight: var(--base-text-weight-normal, 400);
    }

    section .task-list-item.enabled label {
        cursor: pointer;
    }

    section .task-list-item + .task-list-item {
        margin-top: 4px;
    }

    section .task-list-item .handle {
        display: none;
    }

    section .task-list-item-checkbox {
        margin: 0 0.2em 0.25em -1.4em;
        vertical-align: middle;
    }

    section .contains-task-list:dir(rtl) .task-list-item-checkbox {
        margin: 0 -1.6em 0.25em 0.2em;
    }

    section .contains-task-list {
        position: relative;
    }

    section .contains-task-list:focus-within .task-list-item-convert-container,
    section .contains-task-list:hover .task-list-item-convert-container {
        clip: auto;
        display: block;
        height: 24px;
        overflow: visible;
        width: auto;
    }

    section ::-webkit-calendar-picker-indicator {
        filter: invert(50%);
    }

    h1 {
        color: var(--h1-color);
        font-size: 1.6em;
    }

    h1,
    h2 {
        border-bottom: none;
    }

    h2 {
        font-size: 1.3em;
    }

    h3 {
        font-size: 1.1em;
    }

    h4 {
        font-size: 1.05em;
    }

    h5 {
        font-size: 1em;
    }

    h6 {
        font-size: 0.9em;
    }

    h1 strong,
    h2 strong,
    h3 strong,
    h4 strong,
    h5 strong,
    h6 strong {
        color: var(--heading-strong-color);
        font-weight: inherit;
    }

    h1::part(auto-scaling),
    h2::part(auto-scaling),
    h3::part(auto-scaling),
    h4::part(auto-scaling),
    h5::part(auto-scaling),
    h6::part(auto-scaling) {
        max-height: 563px;
    }

    hr {
        height: 0;
        padding-top: 0.25em;
    }

    pre {
        border: 1px solid var(--color-border-default);
        line-height: 1.15;
        overflow: visible;
    }

    pre::part(auto-scaling) {
        max-height: 529px;
    }

    pre :where(.hljs) {
        color: var(--color-prettylights-syntax-storage-modifier-import);
    }

    pre :where(.hljs-doctag),
    pre :where(.hljs-keyword),
    pre :where(.hljs-meta .hljs-keyword),
    pre :where(.hljs-template-tag),
    pre :where(.hljs-template-variable),
    pre :where(.hljs-type),
    pre :where(.hljs-variable.language_) {
        color: var(--color-prettylights-syntax-keyword);
    }

    pre :where(.hljs-title),
    pre :where(.hljs-title.class_),
    pre :where(.hljs-title.class_.inherited__),
    pre :where(.hljs-title.function_) {
        color: var(--color-prettylights-syntax-entity);
    }

    pre :where(.hljs-attr),
    pre :where(.hljs-attribute),
    pre :where(.hljs-literal),
    pre :where(.hljs-meta),
    pre :where(.hljs-number),
    pre :where(.hljs-operator),
    pre :where(.hljs-selector-attr),
    pre :where(.hljs-selector-class),
    pre :where(.hljs-selector-id),
    pre :where(.hljs-variable) {
        color: var(--color-prettylights-syntax-constant);
    }

    pre :where(.hljs-meta .hljs-string),
    pre :where(.hljs-regexp),
    pre :where(.hljs-string) {
        color: var(--color-prettylights-syntax-string);
    }

    pre :where(.hljs-built_in),
    pre :where(.hljs-symbol) {
        color: var(--color-prettylights-syntax-variable);
    }

    pre :where(.hljs-code),
    pre :where(.hljs-comment),
    pre :where(.hljs-formula) {
        color: var(--color-prettylights-syntax-comment);
    }

    pre :where(.hljs-name),
    pre :where(.hljs-quote),
    pre :where(.hljs-selector-pseudo),
    pre :where(.hljs-selector-tag) {
        color: var(--color-prettylights-syntax-entity-tag);
    }

    pre :where(.hljs-subst) {
        color: var(--color-prettylights-syntax-storage-modifier-import);
    }

    pre :where(.hljs-section) {
        color: var(--color-prettylights-syntax-markup-heading);
        font-weight: 700;
    }

    pre :where(.hljs-bullet) {
        color: var(--color-prettylights-syntax-markup-list);
    }

    pre :where(.hljs-emphasis) {
        color: var(--color-prettylights-syntax-markup-italic);
        font-style: italic;
    }

    pre :where(.hljs-strong) {
        color: var(--color-prettylights-syntax-markup-bold);
        font-weight: 700;
    }

    pre :where(.hljs-addition) {
        background-color: var(--color-prettylights-syntax-markup-inserted-bg);
        color: var(--color-prettylights-syntax-markup-inserted-text);
    }

    pre :where(.hljs-deletion) {
        background-color: var(--color-prettylights-syntax-markup-deleted-bg);
        color: var(--color-prettylights-syntax-markup-deleted-text);
    }

    footer,
    header {
        color: var(--header-footer-color);
        font-size: 18px;
        left: 30px;
        margin: 0;
        position: absolute;
    }

    header {
        top: 21px;
    }

    footer {
        bottom: 21px;
    }

    section {
        --h1-color: #246;
        --header-footer-color: hsla(0, 0%, 40%, 0.75);
        --heading-strong-color: #48c;
        --paginate-color: #777;
        align-items: stretch;
        display: flex;
        flex-flow: column nowrap;
        font-size: 29px;
        height: 720px;
        justify-content: center;
        padding: 78.5px;
        width: 1280px;
    }

    section:where(.invert) {
        --h1-color: #cee7ff;
        --header-footer-color: hsla(0, 0%, 60%, 0.75);
        --heading-strong-color: #7bf;
        --paginate-color: #999;
    }

    section > *:last-child,
    section[data-footer] > :nth-last-child(2) {
        margin-bottom: 0;
    }

    section > *:first-child,
    section > header:first-child + * {
        margin-top: 0;
    }

    section::after {
        bottom: 21px;
        color: var(--paginate-color);
        font-size: 24px;
        padding: 0;
        position: absolute;
        right: 30px;
    }

    section[data-color] h1,
    section[data-color] h2,
    section[data-color] h3,
    section[data-color] h4,
    section[data-color] h5,
    section[data-color] h6 {
        color: currentcolor;
    }

    /*
     * Customized
     */
    .columns-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 8px;
    }
    .columns-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 8px;
    }
    .columns-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 8px;
    }
    .columns-5 {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 8px;
    }
    .columns-6 {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-column-gap: 8px;
    }
`;

export default theme.toString().trim();
