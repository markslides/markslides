// export { default as themeCustom } from '@/lib/marp/themes/custom';
// import red from '@/lib/marp/themes/red';
// import green from '@/lib/marp/themes/green';
// import blue from '@/lib/marp/themes/blue';
import red from './red';
import green from './green';
import blue from './blue';

const themes = [
    {
        name: 'red',
        css: red,
    },
    {
        name: 'green',
        css: green,
    },
    {
        name: 'blue',
        css: blue,
    },
];

export default themes;
