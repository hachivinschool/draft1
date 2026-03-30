export default function OutputConsole({ output }) {
  return (
    <div className="bg-black text-green-400 p-2 mt-2 h-32 overflow-auto rounded font-mono">
      {output}
    </div>
  );
}
