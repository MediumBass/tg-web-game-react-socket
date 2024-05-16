import React, {useState, useEffect} from 'react';
import "../css/Players.css"

import Player from "./Player";
import {socket} from "../socket";
let index
let Message;
let finalDmg;
let CalculatedDamage;
let DamagedPlayerHP;
const Players = ({monster, CalculateDamage, playerStats, setThisPlayerIndex,checkIfPlayerDied}) => {

    const [items, setItems] = useState([]);
    const [playersHP, setPlayersHP] = useState([]);
    const [randomizer1, setRandomizer1] = useState(false);
    const [randomizer2, setRandomizer2] = useState(false);
    const [playerID, setDamagedPlayerID] = useState(false);
    const [isStunned, setIsStunned] = useState(false);
    const DealSkill = () =>{
        DamagedPlayerHP=playersHP[index]
        CalculatedDamage = CalculateDamage(monster.dmg,monster.crt,monster.name,playerStats,randomizer1,randomizer2)
        finalDmg = CalculatedDamage[0]
        Message = CalculatedDamage[1]

        let currentHp
        currentHp =DamagedPlayerHP - finalDmg
        socket.emit("PLAYER DAMAGED", {playerId:index, currentHp:currentHp})
        socket.emit("CHANGE MESSAGES", {Message:Message})
        if(currentHp<=0){
            checkIfPlayerDied(true)
            socket.emit("PLAYER DEAD", {playerId:index})
        }


    }
    useEffect(()=>{
        socket.on("WEAPON SUBMITTED", (data) =>{
            setItems(data.team)
            setPlayersHP(data.teamHP)

        })
        socket.on("PLAYER DAMAGED", (data) =>{
            setPlayersHP(data.teamHP)
        })
        socket.on("MONSTER ATTACKS", (data) =>{
            setRandomizer1(data.hitRandomizer1)
            setRandomizer2(data.hitRandomizer2)
            setDamagedPlayerID(data.damagedPlayer)
            setIsStunned(data.isStunned)
            console.log("monstr atakoval")
        })
    },[])
    useEffect(()=>{
    index = items.findIndex(el => el.socketId == socket.id)
    console.log(index)
        setThisPlayerIndex(index)
    },[items])

    useEffect(()=> {
        if(index===playerID){
            if(!isStunned)
                DealSkill()

        }
    },[randomizer1])

        return (
            <div className={"players"}>
                {items.map(item => (
                    <Player key={item.id} item={item} playersHP={playersHP[items.indexOf(item)]} playerStats={playerStats}
                            randomizer1={randomizer1} randomizer2={randomizer2} playerID={playerID} monster={monster} CalculateDamage={CalculateDamage} isStunned={isStunned} />
                ))}
            </div>
        );

};

export default Players;