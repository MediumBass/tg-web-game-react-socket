import React, {useEffect} from 'react';
import "../css/ModalWeaponChoose.css"
import NewSkill from "./NewSkill";
import {socket} from "../socket";
let colors =[" ","white", "LightBlue","RebeccaPurple","Gold","yellow","green"]
let currentStats

const ModalNewSkill = ({active, setActive, savePlayerSkills, items ,FirstSkill, SecondSkill, ThirdSkill,
                           playerStats, savePlayerStats, setTrinket, thisPlayerIndex, modalDeath}) => {


    useEffect(() => {
         currentStats=playerStats
    }, [playerStats])



    const [skillId, setSkillId] = React.useState(0);
    const [skillName, setSkillName] = React.useState("");
    const chooseSkill = (skillId) =>{
        setSkillId(skillId)
        setSkillName(items[skillId].name)
    }
    useEffect(() => {

    }, [])

    const   postSkill = (skillId) => {

       switch (items[skillId].attackType) {
           case "statup":
               switch (items[skillId].stat) {
                   case 0:
                       currentStats.dmg+=items[skillId].mlt
                       console.log( currentStats.dmg,items[skillId].mlt)
                       break;
                   case 1:
                       currentStats.arm+=items[skillId].mlt
                       console.log( currentStats.arm,items[skillId].mlt)
                       break;
                   case 2:
                       currentStats.spd+=items[skillId].mlt
                       console.log( currentStats.spd,items[skillId].mlt)
                       break;
                   case 3:
                       currentStats.crt+=items[skillId].mlt
                       console.log( currentStats.crt,items[skillId].mlt)
                       break;

               }
               savePlayerStats(currentStats)
               console.log("save otrabotal")
               break;
           case "everyoneStatup":
               socket.emit("EVERYONE STATUP SKILL", {everyoneID:items[skillId].statupSkillId})
               break;
           case "trinket":
               setTrinket(items[skillId])
               break;
           case "heal":
               socket.emit("PLAYER HEAL", {playerId:thisPlayerIndex,
                                                    heal:items[skillId].heal})
               console.log("heal otpravil",thisPlayerIndex, items[skillId].heal)
               break;
           default:
               savePlayerSkills(skillId)
               break;
       }
        setActive(false)
    }

        return (
            <div className={active&&!modalDeath ? "modal active" : "modal"} >
                <div className="modal__content">
                    <NewSkill skill={items[FirstSkill]   } colors={colors} chooseSkill={chooseSkill}/>
                    <NewSkill skill={items[SecondSkill]  } colors={colors} chooseSkill={chooseSkill}/>
                    <NewSkill skill={items[ThirdSkill]   } colors={colors} chooseSkill={chooseSkill}/>

                    <button className={"button89"}
                        onClick={() => postSkill(skillId)}> Choose {skillName}</button>

                </div>
            </div>
        );

};
export default ModalNewSkill;