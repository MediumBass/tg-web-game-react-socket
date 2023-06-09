import React from 'react';
import "./HPBar.css"
import "../css/NewSkill.css"
const Weapon = (props) => {

    return (
        <div className={"newSkill"} onClick={() => props.chooseWeapon(props.id)}  >
            <img src={props.img} width={64} height={32} alt={"weapon"}></img>
            <p><b>{props.name}</b></p>
            <p>{props.desc}</p>
        </div>
    );
};

export default Weapon;