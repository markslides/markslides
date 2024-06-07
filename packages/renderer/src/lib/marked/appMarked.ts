import { marked } from 'marked';
import DOMPurify from 'dompurify';

type MarkedInstance = {
    render: (content: string) => string;
};

const appMarked = (function () {
    let instance: MarkedInstance;

    function createInstance() {
        const markedInstance: MarkedInstance = {
            render: (content: string) => {
                return DOMPurify.sanitize(marked.parse(content) as string);
            },
        };

        return markedInstance;
    }

    return {
        createInstance,
        getDefaultInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

export default appMarked;
