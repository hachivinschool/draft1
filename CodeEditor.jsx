import React, { useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import initPyodide from 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
import OutputConsole from './OutputConsole';

export default function CodeEditor() {
  const [editor, setEditor] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState("");

  useEffect(() => {
    if (!editor) {
      const e = monaco.editor.create(document.getElementById('editor'), {
        value: "# Python code\nprint('Hello AI World!')",
        language: 'python',
        theme: 'vs-dark'
      });
      setEditor(e);
    }

    if (!pyodide) {
      (async () => {
        const py = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
        await py.loadPackage(['matplotlib', 'numpy', 'pandas']);
        setPyodide(py);
      })();
    }
  }, []);

  const runCode = async () => {
    if (pyodide && editor) {
      try {
        // Redirect print to consoleOutput
        pyodide.runPython(`
import sys
from js import setConsoleOutput
class ConsoleIO:
    def write(self, s):
        setConsoleOutput(s)
    def flush(self):
        pass
sys.stdout = sys.stderr = ConsoleIO()
`);
        window.setConsoleOutput = (msg) => setConsoleOutput(prev => prev + msg + "\n");

        await pyodide.runPythonAsync(editor.getValue());
      } catch (err) {
        setConsoleOutput(prev => prev + err + "\n");
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div id="editor" className="flex-1 border rounded"></div>
      <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={runCode}>Run</button>
      <OutputConsole output={consoleOutput} />
    </div>
  );
}
