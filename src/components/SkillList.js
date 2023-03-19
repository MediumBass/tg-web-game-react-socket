import React, {useEffect, useState} from 'react';
import './SkillList.css';
import SkillDescription from "./SkillDescription";
import ObtainedSkills from "./ObtainedSkills";
import socket from "../socket";
import '../index.css';
import ModalNewSkill from "./ModalNewSkill";
import ModalGameEnd from "./ModalGameEnd";

let SkillDescriptionManaCost
let SkillDescriptionDmg
let CurrentItem
let FirstSkill = 0
let SecondSkill = 0
let ThirdSkill = 0
let b= "START"
const SkillList = ({playerStats, monster,currentHp,calculateCurrentHp, CalculateDamage, savePlayerStats, statsChanged, items, setTrinket,
                       trinket, thisPlayerIndex, modalDeath, setModalDeath, setModalWeapon, setItems}) => {

    const [obtainedSkills, setObtainedSkills] = useState([{
        "id": 0,
        "classId": 0,
        "name": "tychka",
        "dmg": "0",
        "cd": 1,
        "price": 0,
        "needTarget": 0,
        "mlt": 1,
        "manaCost": 0,
        "attackType": "normal",
        "desc": "Basic hit, nothing special"
    },
        {
            "id": 1,
            "classId": 0,
            "name": "Skip Turn",
            "dmg": "0",
            "cd": 0,
            "price": 0,
            "needTarget": 0,
            "mlt": 1,
            "manaCost": 0,
            "attackType": "skip",
            "desc": "Skip turn"
        },]);
    let CurrentObtainedSkills = obtainedSkills

    // Monster
    const [playerIsDead, setPlayerIsDead] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const Start = () => {
        if(gameStarted===false) {
            socket.emit("SKILL USED", {currentHp: 9999})
            setGameStarted(true)
            b="RESTART"
        }else{
            socket.emit("RESTART")

        }
    }

    // DamageCalculations

    const [message, setMessage] = useState("");


    const chooseMessage = (message, message2, item) => {
        setMessage(message);
        SkillDescriptionDmg = message2
        CurrentItem = item
        SkillDescriptionManaCost = item.manaCost
    };


    // EndOfTheRound

    const [modalNewSkillActive, setModalNewSkillActive] = useState(false)


    const savePlayerSkills = (skills) => {
        CurrentObtainedSkills.push(items[skills])
        setObtainedSkills(CurrentObtainedSkills)
    }
    const endOfTheRound = (value) => {
        FirstSkill = Math.floor(Math.random() * items.length)
        SecondSkill = Math.floor(Math.random() * items.length)
        ThirdSkill = Math.floor(Math.random() * items.length)


    }
    useEffect(() => {
        socket.on("MONSTER DEAD", (data) => {
            endOfTheRound(1)
            setModalNewSkillActive(true)

        })

    }, [endOfTheRound])
    // GetSkills





        return (
            <div className="footer">
                <button onClick={Start}>{b}</button>


                <SkillDescription desc={message} dmg={SkillDescriptionDmg} manaCost={SkillDescriptionManaCost}  currentHp={currentHp} monster={monster}
                                  endOfTheRound={endOfTheRound} calculateCurrentHp={calculateCurrentHp} statsChanged={statsChanged}
                                  playerStats={playerStats} item={CurrentItem} CalculateDamage={CalculateDamage} trinket={trinket}
                                  modalDeath={modalDeath} setModalDeath={setModalDeath} playerIsDead={playerIsDead} setPlayerIsDead={setPlayerIsDead}
                                  gameStarted={gameStarted}
                                   />
                <div className={"wrapper"}>
                    {obtainedSkills.map(item => (
                        <ObtainedSkills  key={item.name} item={item}
                                         chooseMessage={chooseMessage} />
                    ))}
                </div>
                <ModalNewSkill  active={modalNewSkillActive} setActive={setModalNewSkillActive} items={items}
                                savePlayerSkills={savePlayerSkills} savePlayerStats={savePlayerStats} playerStats={playerStats}
                                FirstSkill={FirstSkill}  SecondSkill={SecondSkill} ThirdSkill={ThirdSkill}
                                setTrinket={setTrinket} thisPlayerIndex={thisPlayerIndex} modalDeath={modalDeath}/>
                <ModalGameEnd  />
            </div>
        );

}
export default SkillList;