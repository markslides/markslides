type Slide = {
    config: string;
    content: string;
};

export const slides = Object.freeze(
    new Array<Slide>(100).fill({
        config: `
marp: true
header: Navy Template
footer: 
paginate: true
class: invert
theme: default
size: 16:9
style: |
  pre {
    overflow: scroll;
  }
`,
        content: `
![bg right](https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTU5NjN8MHwxfHNlYXJjaHwzfHxSZWFjdHxlbnwwfDF8fHwxNzExMDkwMTI0fDA&ixlib=rb-4.0.3&q=85)

# Beginner's Guide to React

Inje Lee

---

# What is React?

- JavaScript library for building user interfaces
- Developed by Facebook
- Allows for efficient and reusable UI components

<!-- React is a JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive and dynamic web applications. One of the key features of React is its ability to create reusable UI components, which makes it easier to maintain and update the codebase. -->

---

# Why use React?

- Virtual DOM for efficient rendering
- Component-based architecture
- Large and active community support

<!-- React uses a virtual DOM, which allows for efficient rendering of UI components. It only updates the parts of the DOM that have changed, resulting in better performance. React also follows a component-based architecture, making it easier to build and maintain complex UIs. Additionally, React has a large and active community, providing extensive support and resources. -->

---

# React Components

- Building blocks of React applications
- Encapsulate UI logic and functionality
- Can be reused and composed together

<!-- React components are the building blocks of React applications. They encapsulate UI logic and functionality, making it easier to manage and reuse code. Components can be composed together to create complex UIs, allowing for modular and scalable development. -->

---

# JSX Syntax

- JavaScript XML syntax extension
- Allows for writing HTML-like code in JavaScript
- Transpiled to JavaScript by Babel

\`\`\`jsx
const element = <h1>Hello, React!</h1>;
\`\`\`

<!-- JSX is a syntax extension for JavaScript that allows for writing HTML-like code in JavaScript. It provides a more declarative way of defining UI components. JSX code is transpiled to JavaScript by tools like Babel before being executed by the browser. -->

---

# React Component Lifecycle

- Mounting: Component is being created and inserted into the DOM
- Updating: Component is being re-rendered due to changes in props or state
- Unmounting: Component is being removed from the DOM

<!-- The React component lifecycle consists of three main phases: mounting, updating, and unmounting. During the mounting phase, the component is being created and inserted into the DOM. The updating phase occurs when the component is being re-rendered due to changes in props or state. Finally, the unmounting phase happens when the component is being removed from the DOM. -->

---

# State and Props

- State: Internal data of a component
- Props: External data passed to a component

\`\`\`jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <h1>{this.state.count}</h1>;
  }
}
\`\`\`

<!-- In React, state represents the internal data of a component. It can be modified using the \`setState\` method. Props, on the other hand, are external data passed to a component. They are read-only and cannot be modified by the component itself. In the example above, the \`Counter\` component has a state property \`count\` which is displayed in the rendered output. -->

---

# React Hooks

- Introduced in React 16.8
- Allows functional components to have state and lifecycle methods
- Simplifies component logic and reduces code duplication

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return <h1>{count}</h1>;
}
\`\`\`

<!-- React Hooks were introduced in React 16.8 as a way to add state and lifecycle methods to functional components. They provide a simpler and more concise way of managing component logic. In the example above, the \`Counter\` component uses the \`useState\` hook to manage the state and the \`useEffect\` hook to update the document title whenever the count changes. -->

---

# React Router

- Library for handling routing in React applications
- Allows for navigation between different components/pages
- Provides declarative routing configuration

\`\`\`jsx
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
}
\`\`\`

<!-- React Router is a popular library for handling routing in React applications. It allows for navigation between different components or pages based on the URL. React Router provides a declarative way of configuring routes using components like \`Router\`, \`Switch\`, and \`Route\`. In the example above, the \`App\` component sets up the routes for the home, about, and contact pages. -->

---

# React Testing Library

- Library for testing React components
- Focuses on testing user interactions and behavior
- Encourages writing tests from the user's perspective

\`\`\`jsx
import { render, fireEvent } from '@testing-library/react';

test('increments counter on button click', () => {
  const { getByText } = render(<Counter />);
  const button = getByText('Increment');

  fireEvent.click(button);

  expect(getByText('1')).toBeInTheDocument();
});
\`\`\`

<!-- React Testing Library is a testing library specifically designed for testing React components. It focuses on testing user interactions and behavior rather than implementation details. The library provides utilities like \`render\` and \`fireEvent\` for rendering components and simulating user interactions. In the example above, a test is written to check if the counter increments correctly when the button is clicked. -->

---

# Resources

- Official React documentation: [https://reactjs.org/](https://reactjs.org/)
- React Hooks documentation: [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
- React Router documentation: [https://reactrouter.com/](https://reactrouter.com/)
- React Testing Library documentation: [https://testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro)

<!-- Here are some resources to learn more about React and related libraries:

- Official React documentation: [https://reactjs.org/](https://reactjs.org/)
- React Hooks documentation: [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
- React Router documentation: [https://reactrouter.com/](https://reactrouter.com/)
- React Testing Library documentation: [https://testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro) -->

---

# Thank You!

<!-- Thank you for attending this beginner's guide to React presentation. If you have any questions, feel free to ask. Happy coding with React! -->
`,
    })
);
