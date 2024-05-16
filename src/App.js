import './App.css';
import React, {useEffect, useState} from 'react';
import {socket, baseURL} from "./socket";
import Players from "./components/Players";
import Monster from "./components/Monster";
import SkillList from "./components/SkillList";
import ChatLog from "./components/ChatLog";
import ModalWeaponChoose from "./components/ModalWeaponChoose";

const tele = window.Telegram.WebApp

let ThisClassSkills=[]

function App() {
    useEffect(() => {
        tele.ready()
    }, [])


    //getSkills
    // GetSkills
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [modalDeath, setModalDeath] = useState(false);

    const addUniSkills = (ID) => {
        let allSkills = []
        allSkills.push(...ThisClassSkills[0])
        allSkills.push(...ThisClassSkills[1])
        allSkills.push(...ThisClassSkills[ID + 2])
        setItems(allSkills)

    }
    const checkIfPlayerDied = (playerState) =>{
        setModalDeath(playerState)
    }
    //calculations
    function CalculateDamage(AttackStat, AttackCrt, AttackName, Victim, Randomizer1, Randomizer2) {
        let damage = AttackStat
        let message

        if (damage <= Victim.arm) {
            damage = 0
            message = Victim.name + " armor wasn`t penetrated."
        } else {
            damage = damage - Victim.arm
            message = AttackName + " deal " + damage + " damage to " + Victim.name
        }
        if (Randomizer1 <= AttackCrt) {
            damage = damage * 2
            message = "CRITICAL STRIKE! on " + damage + " by " + AttackName
        }
        if (Randomizer2 <= Victim.spd / 20) {
            damage = 0
            message = Victim.name + " evaids " + AttackName + " attack. "
        }

        return [damage, message]
    };
    // ModalWeaponChoose

    const [modalActive, setModalActive] = useState(true)
    const [playerStats, setPlayerStats] = useState([])
    const [statsChanged, setStatsChanged] = useState(0)
    const [weaponID, setWeaponID] = useState([])
    const [trinket, setTrinket] = useState([])
    const [thisPlayerIndex, setThisPlayerIndex] = useState([])
    
    const savePlayerStats = (stats) => {
        setPlayerStats(stats)
        setStatsChanged(statsChanged + 1)

    }
    //Monster
    const [monster, setMonster] = useState([])
    const [currentHp, setCurrentHp] = useState([])
    const calculateCurrentHp = (hp) => {
        setCurrentHp(hp)
    };
    // ModalGameEnd


    useEffect(() => {
        socket.on("SKILL USED", (data) => {
            setMonster(data)
            setCurrentHp(data.hp)

        })
        socket.on("RESTART", (data) => {
            window.location.reload()
        })
    }, [])
    useEffect(() => {
        fetch(baseURL+"/skilllist")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.weaponSkills[0]);
                    ThisClassSkills = result.weaponSkills;
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="App-header">
                    <header className="App-main">

                        <div className="vertic">
                            <div className="horizont">
                                <div className="vertic">
                                    <Players playerStats={playerStats} monster={monster}
                                             CalculateDamage={CalculateDamage} setThisPlayerIndex={setThisPlayerIndex}
                                             checkIfPlayerDied={checkIfPlayerDied} />
                                    <ChatLog/>

                                </div>
                                <Monster className="monster" name={monster.name} maxhp={monster.maxhp} img={monster.img}
                                         currentHP={currentHp}/>
                            </div>

                            <SkillList playerStats={playerStats} monster={monster} currentHp={currentHp} items={items}
                                       CalculateDamage={CalculateDamage} calculateCurrentHp={calculateCurrentHp}
                                       savePlayerStats={savePlayerStats} statsChanged={statsChanged}
                                       weaponSubmitted={weaponID} thisPlayerIndex={thisPlayerIndex}
                                       trinket={trinket} setTrinket={setTrinket}
                                       modalDeath={modalDeath} setModalDeath={setModalDeath}
                                       setModalWeapon={setModalActive} setItems={setItems} />
                        </div>

                    </header>

                </div>
                <ModalWeaponChoose active={modalActive} setActive={setModalActive}
                                   savePlayerStats={savePlayerStats} addUniSkills={addUniSkills} />

            </div>
        );
    }
}

export default App;
