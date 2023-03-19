import React, {useEffect, useState} from 'react';
import socket from "../socket";
import "../css/SkillDescription.css"
import ModalDeath from "./ModalDeath";

let BaseDmg
let finalDmg
let Message=""
let WeaponName
let CalculatedDamage
let Randomizer1
let Randomizer2
let CurrentStats
let MonsterStats
let bleedCounter=0
let bleedDmg=0
let AllTimeDamage=0
const SkillDescription = (props) => {

    const [isStunned, setIsStunned] = useState(false);
    const [isBleeding, setIsBleeding] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [turn, setTurn] = useState(1);
    const [playersMana, setPlayersMana] = useState(200);

    const [modalDead, setModalDead] = useState(false);
    // set player stats
    useEffect(()=>{
            CurrentStats = [
            props.playerStats.dmg,//0 DMG
            props.playerStats.arm,//1 ARM
            props.playerStats.spd,//2 SPD
            props.playerStats.crt,//3 CRT
            props.playerStats.hp, //4 HP
            props.playerStats.manaPool  //5 mana
        ]

    },[props.statsChanged])
    // set monster stats
    useEffect(()=>{
        MonsterStats = [
            props.monster.dmg,  //0 DMG
            props.monster.arm,  //1 ARM
            props.monster.spd,  //2 SPD
            props.monster.crt,  //3 CRT
            props.monster.maxhp,//4 HP
        ]

    //bleed
    },[ props.monster])
    useEffect(()=>{
        socket.on("MONSTER STATE", (data) =>{
            setIsStunned(data.isStunned)
            setIsBleeding(data.isBleeding)
        })


    },[])
const becomeSpectator = () =>{
        setModalDead(false)
        props.setPlayerIsDead(true)
}
   const DealSkill = () =>{
       setIsActive(false)

       Randomizer1=Math.random()
       Randomizer2=Math.random()
       WeaponName=props.playerStats.name

       switch (props.item.attackType) {
           case "normal":
               BaseDmg = CurrentStats[props.item.dmg]*props.item.mlt
               if(props.trinket.name==="Grindstone"){
                   BaseDmg+=1
               }   //trinket
               break;
           case "compare":

               if(CurrentStats[props.item.compLeft]>MonsterStats[props.item.compRight]){
               BaseDmg = CurrentStats[props.item.dmg]*props.item.mlt
            }
               else
                   BaseDmg =CurrentStats[props.item.dmg]
               break;
           case "stun":
               BaseDmg = CurrentStats[props.item.dmg]*props.item.mlt
               console.log(isStunned)
               Message += props.monster.name+" is stunned "
               socket.emit("MONSTER STATE", {
                   isStunned:true,

               })
               break;
           case "bleed":
               BaseDmg = CurrentStats[props.item.dmg]*props.item.mlt
               CalculatedDamage = props.CalculateDamage(BaseDmg,CurrentStats[3],WeaponName,props.monster,Randomizer1,Randomizer2)
               bleedCounter+=props.item.bleedDuration
               bleedDmg=props.item.bleedDmg
               if(props.trinket.name!=="Weakening Poison"){
                   bleedDmg=props.item.bleedDmg+2
               }
               Message += props.monster.name+" is bleeding, "
               if(CalculatedDamage[0]==0&&props.trinket.name!=="Internal Bleeding"){    //trinket
                   bleedCounter+=0
                   bleedDmg+=0
                   Message += "Bleed failed, "
               }

               socket.emit("MONSTER STATE", {
                   isBleeding:true,
                   bleedCounter:bleedCounter,
                   bleedDmg:bleedDmg
               })
               break;
           case "pierce":
               BaseDmg = (CurrentStats[props.item.dmg]+props.monster.arm)*props.item.mlt
               break;
           case "afterStun":
               if(isStunned) {
                   BaseDmg = CurrentStats[props.item.dmg]*props.item.mlt
               }
               break;
           case "afterBleed":
               if(isBleeding) {
                   BaseDmg = CurrentStats[props.item.dmg]*props.item.mlt
               }
               break;
           case "skip":
               BaseDmg = 0
               break;
       }
       CalculatedDamage = props.CalculateDamage(BaseDmg,CurrentStats[3],WeaponName,props.monster,Randomizer1,Randomizer2)
       finalDmg = CalculatedDamage[0]
       Message += CalculatedDamage[1]
       AllTimeDamage+=finalDmg
       setPlayersMana(prevState => prevState - props.item.manaCost)
       let currentHp
           currentHp = props.currentHp-finalDmg
           props.calculateCurrentHp(currentHp)
       socket.emit("SKILL USED",{finalDmg: finalDmg, Message:Message, currentHp:currentHp, isActive:WeaponName})
       socket.emit("CHANGE MESSAGES", {Message:Message})
       Message=""
   }

    useEffect(()=>{
    socket.on("MONSTER ATTACKS", (data) =>{
        setIsActive(true)
            let turnChange=turn+1
                    setTurn(turnChange)
            let mp=playersMana+25
        if(mp<225){
        setPlayersMana(mp)}
    })
    },[playersMana])

    useEffect(()=>{
        props.setPlayerIsDead(props.modalDeath)
        setModalDead(props.modalDeath)
    },[props.modalDeath])

    return (
        <div className="skillDescription">
            <p>{props.desc}      [{props.manaCost}]</p>
            <div className={"horizont"}>
                <p> MANA    :{playersMana}/{props.playerStats.manaPool}</p>
                <button onClick={DealSkill} disabled={!isActive||playersMana<props.manaCost||props.playerIsDead||props.manaCost===undefined} className={"button-89"}>Use Skill</button>
            </div>

            <ModalDeath active={modalDead} becomeSpectator={becomeSpectator} AllTimeDamage={AllTimeDamage} />
        </div>
    );
};

export default SkillDescription;