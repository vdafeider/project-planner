import './App.css';
import AddNew from './features/components/addnew'
import ListOfProj from './features/components/listofproj'

function App() {
  return (
    <div className="App">
      <h1>WEB PROJECTS LIST</h1>
      <AddNew/>
      <ListOfProj/>
    </div>
  );
}

export default App;
