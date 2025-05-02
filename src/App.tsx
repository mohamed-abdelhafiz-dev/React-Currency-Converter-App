import Card from "./components/Card";

export default function App() {
  return (
    <div
      id="app"
      className="overflow-y-scroll scrollbar-thin 
      scrollbar-thumb-indigo-800 scrollbar-track-indigo-400
        bg-main-bg flex-center selection:bg-main-bg selection:text-white"
    >
      <Card />
    </div>
  );
}
