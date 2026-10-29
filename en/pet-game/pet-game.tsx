const { useState, useEffect,useRef } = React;

export enum PetMood {
  HAPPY,
  EXCITED ,
  CONTENT ,
  SAD ,
  TIRED ,
  SICK ,
  HUNGRY ,
}

export const obj: Record<PetMood, string> = {
   [PetMood.HAPPY]: "😊",
  [PetMood.EXCITED]: "🤩",
  [PetMood.CONTENT]: "😌",
  [PetMood.SAD]: "😢",
  [PetMood.TIRED]: "😴",
  [PetMood.SICK]: "🤢",
  [PetMood.HUNGRY]: "🍖",
};

export const PetGame = () => {
const [name,setName] =  useState("")
  return (
    <div  className="game-container">
    <header>
    <h1>Digital Pet Game</h1>
<p>Take care of your virtual companion!</p>
    </header> 
     
{!name ? <FormElement setName={setName}/>:  
   <ContainerDiv name={name}/>
}
    </div>
  ) 
};
const FormElement = ({ setName }: { setName: (value: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    if (!value) {
      setError("Please name your pet before starting.");
      return;
    }
    setName(value);
  };
 
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="pet-name">Enter the name of your pet</label>
        <input type="text" id="pet-name" ref={inputRef} />
        <button id="set-name-btn" type="submit">Start Game</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
const ContainerDiv = ({name}:{name:string})=>{

const [hunger,setHunger] = useState(0);
const[energy,setEnergy] = useState(100);
const [happiness,setHappiness] = useState(100);

function getMood(
  hunger: number,
  happiness: number,
  energy: number
): string {
  if (hunger > 70) return obj[PetMood.HUNGRY];
  if (energy < 30) return obj[PetMood.TIRED];
  if (happiness > 80 && energy > 70) return obj[PetMood.EXCITED];
  if (happiness > 60) return obj[PetMood.HAPPY];

  return obj[PetMood.CONTENT];
}
function getStatus(value:number):string{

  if(value>70) return "high";
  if(value>40) return "medium";
  return "low"
}
function getStausForHunger(value:number):string{
  if(value<40) return "high"

  if(value<70) return "medium"
return "low"
}

useEffect(() => {
  const timer = setTimeout(() => {
    
     setEnergy(prev => Math.min(100, prev + 5));
    setHappiness(prev => Math.max(0, prev - 5));
     setHunger(prev => Math.min(100, prev + 5));
  }, 12000);
 
  return () => clearTimeout(timer);
}, [hunger, energy, happiness]);
return (
<section >
<div className="base-container">
<p className="pet-name">{name}</p>
<p className="pet-sprite">{getMood(hunger,happiness,energy)}</p>
<div className="pet-buttons">
<button id="eat-action" className="pet-button"
onClick={
  ()=>{
      setHunger(prev => Math.max(0, prev - 5));
    setEnergy(prev => Math.min(100, prev + 5));
  }
}
>Eat</button>
<button className="pet-button" id="play-action" onClick={
  ()=>{
     setEnergy(prev => Math.max(0, prev - 5));
    setHappiness(prev => Math.min(100, prev + 5));
  }
}>Play</button>
<button className="pet-button" id="sleep-action" onClick={
  ()=>{
     setHunger(prev => Math.min(100, prev + 5));
    setEnergy(prev => Math.min(100, prev + 5));
  }
}>Sleep</button>
</div>
</div>

<div className="stats-grid">
<article className="stat-bar stat">
<div className="stat-header">
<div className="stat-icon" aria-hidden>
🍽️
</div>

<p className="stat-name">Hunger</p>
<p className="stat-value">{hunger}%</p>
</div>
<div className={`stat-progress`}>
<div className={`stat-fill ${getStausForHunger(hunger)}`} style={{width:`${hunger}%`}}></div>
</div>
</article>  

<article className="stat-bar stat">
<div className="stat-header">
<div className="stat-icon" aria-hidden>😊
</div>
<p className="stat-name">Happiness</p>
<p className="stat-value">{happiness}%</p>
</div>
<div className={`stat-progress`}>
<div className={`stat-fill ${getStatus(happiness)}`} style={{width:`${happiness}%`}}></div>
</div>
</article>

<article className="stat-bar stat">
<div className="stat-header">
<div className="stat-icon" aria-hidden>⚡
</div>
<p className="stat-name">Energy</p>
<p className="stat-value">{energy}%</p>
</div>
<div className={`stat-progress`}>
<div className={`stat-fill ${getStatus(energy)}`} style={{width:`${energy}%`}}></div>
</div>
</article>

</div>
<div id="pet-cat" className="base-container">
<h2>Species: Cat</h2>
<p>Pet Fact: It has been said that the Ukrainian Levkoy has the appearance of a dog, due to the angles of its face</p>
</div>

</section>
)


}
