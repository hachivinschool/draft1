import React, { useState } from 'react';
import axios from 'axios';

export default function ProjectSpace() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const saveProject = async () => {
    await axios.post('http://localhost:5000/api/saveProject', { name, code });
    alert('Project saved!');
  };

  const loadProject = async () => {
    const res = await axios.get(`http://localhost:5000/api/loadProject/${name}`);
    setCode(res.data.code);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4 flex flex-col gap-2">
      <h2 className="font-bold">Project Space</h2>
      <input className="border p-1 rounded" placeholder="Project name" value={name} onChange={e => setName(e.target.value)} />
      <textarea className="border p-2 rounded h-32" value={code} onChange={e => setCode(e.target.value)} />
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={saveProject}>Save</button>
        <button className="bg-gray-500 text-white p-2 rounded" onClick={loadProject}>Load</button>
      </div>
    </div>
  );
}
