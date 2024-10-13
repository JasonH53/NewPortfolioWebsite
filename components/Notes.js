import React, { useState, useEffect, useRef } from 'react';
import styles from './notes.module.css';

const CLI = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const academicStructure = {
    'Fall 2023': {
      'No notes available': '',
    },
    'Winter 2024': {
      'CS 136': 'CS136.pdf',
      'MATH 138': 'MATH_138.pdf',
      'MATH 136': 'MATH_136.pdf'
    },
    'Summer 2024': {
      'CS 246': 'CS246.pdf',
      'CS 245': 'CS245.pdf',
      'STAT 230': 'STAT230.pdf',
      'ENGL 119': 'ENGL119.pdf'
    },
    'Fall 2024': {
      'No notes available yet': ''
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    showWelcomeMessage();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOutput(`$ ${input}`);
    processCommand(input);
    setInput('');
  };

  const processCommand = (cmd) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();

    switch (command) {
      case 'ls':
      case 'dir':
        listDirectory();
        break;
      case 'get':
        if (parts.length < 2) {
          addOutput('Error: Please specify a course name.');
        } else {
          getCourseNotes(parts.slice(1).join(' '));
        }
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'help':
        showHelp();
        break;
      default:
        addOutput(`Command not recognized: ${command}`);
    }
  };

  const listDirectory = () => {
    let result = 'Academic Structure:\n';
    for (const term in academicStructure) {
      result += `${term}/\n`;
      for (const course in academicStructure[term]) {
        result += `  ${course}\n`;
      }
    }
    addOutput(result);
  };

  const getCourseNotes = (courseName) => {
    for (const term in academicStructure) {
      if (academicStructure[term][courseName]) {
        const fileName = academicStructure[term][courseName];
        const link = `/assets/${fileName}`;
        addOutput(<>Notes for {courseName}: <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>{fileName}</a></>);
        return;
      }
    }
    addOutput(`Course not found: ${courseName}`);
  };

  const showHelp = () => {
    const helpText = `
Available commands:
- ls / dir: List the directory structure
- get <course name>: Get a link to the course notes
- clear: Clear the console output
- help: Show this help message
    `;
    addOutput(helpText);
  };

  const showWelcomeMessage = () => {
    const welcomeMessage = `
Welcome to the Jason's notes1
Here are the available commands:

- ls / dir: List the directory structure
- get <course name>: Get a link to the course notes
- clear: Clear the console output
- help: Show this help message

Type a command and press Enter to begin.
    `;
    addOutput(welcomeMessage);
  };

  const addOutput = (text) => {
    setOutput((prev) => [...prev, text]);
  };

  return (
    <div className={styles.cli}>
      <div className={styles.output} ref={outputRef}>
        {output.map((line, index) => (
          <div key={index} className={styles.line}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <span className={styles.prompt}>$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          className={styles.input}
        />
      </form>
    </div>
  );
};

export default CLI;