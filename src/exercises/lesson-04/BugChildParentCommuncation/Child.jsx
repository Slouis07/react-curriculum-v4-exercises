export default function Child({ increment }) {
  return <button onClick={increment}>Increment Counter</button>;
}

// Child receives the increment function through props from Parent.
// Clicking the button calls that function.
