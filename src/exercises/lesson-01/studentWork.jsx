//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function AboutMe() {
  //add variables here
  const name = 'Severine';
  const age = 26;
  const hobbies = ['Reading', 'Watching TV', 'Cooking'];
  return (
    <div>
      {/* add JSX here */}
      <h1>About Me:</h1>
      <p>
        Hi there! I'm Severine, someone who is learning web development to build
        clean, interactive user interfaces with React. When I'm not coding or
        learning new tech concepts, you can usually find me doing these hobbies:
      </p>
      <ul>
        {hobbies.map((hobby, i) => (
          <li key={i}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
