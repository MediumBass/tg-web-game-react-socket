import React from 'react';
import HPBar from "./HPBar";
import './Monster.css';

const Monster = (props) => {

        return (
            <div className={"Monster"}>
                <img src={props.img} alt={"monster"} width={200} height={256}></img>
                <p>{props.name}  {props.currentHP}/ {props.maxhp}</p>
                <HPBar hp={props.currentHP} maxHp={props.maxhp} width={200} />

            </div>
        );


}

export default Monster;