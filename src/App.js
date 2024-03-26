import logo from './logo.svg';
import './App.css';
import { useState , useCallback , useEffect, useRef} from 'react';

function App() {
  const [length, setLength]= useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
const [Password, setPassword] = useState("");
//useRef Hook
const passwordRef = useRef(null);


const passwordGenerator = useCallback( ()=>{
  let pass="";
  let str="ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str +="0123456789"
  if(charAllowed) str +="!@#$%^&*()-_=+\|[]{};:/?.>"
  for(let i = 1; i<=length; i++){
    let char = Math.floor(Math.random() *str.length +1);
     pass  += str.charAt(char);
    

  }
  setPassword(pass);

},[length,numberAllowed,charAllowed,setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,6);
  window.navigator.clipboard.writeText(Password)
},[Password])

useEffect(()=>{
  passwordGenerator()

},[length,numberAllowed,charAllowed,passwordGenerator])

return (
    <div> 
<h1>Password Generator</h1>
<input type='text'
value={Password} 
readOnly
placeholder='Password'
ref={passwordRef}/>
<div>
<button onClick={copyPasswordToClipboard}>Copy</button>
<label>length:{length}</label>
</div>
<input
type='range'
min={6}
max={24}
value={length}
onChange = {(e)=>{setLength(e.target.value)}}


/>
<input
type='checkbox'
defaultChecked={numberAllowed}
id='numberInput'

onChange = {()=>{
  setNumberAllowed((prev)=>!prev);}}



/>
<label htmlFor='numberInput'>Numbers</label>
<div>
<input
type='checkbox'
defaultChecked={charAllowed}
id='numberInput'

onChange = {()=>{
 setCharAllowed((prev)=>!prev);}}



/>
<label htmlFor='numberInput'>char</label>
</div>



  
    </div>

  );
}

export default App;
