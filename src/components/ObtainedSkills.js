import React  from 'react';
import "../css/ObtainedSkills.css"



const ObtainedSkills = (props) => {

    let description = props.item.desc;
    let finalDmg
    let item

    const CalculatedDamage = () =>{
        finalDmg = props.item.dmg
        item=props.item

        props.chooseMessage(description,finalDmg,item)

    }
    return (


            <div onClick={CalculatedDamage} className="obtained">
                <p> {props.item.name}</p>

            </div>


    )
};



export default ObtainedSkills;