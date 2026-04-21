import './Home.css'
import Data from "./Data";
export default function Home(){
  const userId = 9999;   // parent data
  return(
    <>
    <div class="d">
        <Data id={userId} />   {/* passing prop */}
    <h1 id="h">This is Home Page</h1>
    <p id="h">Programming Language</p>
    <ol>
    <li>C</li><li>CPP</li>
<li>JAVA</li><li>PYTHON</li><li>SQL</li>
    </ol>
    </div>
    </>
  )
}