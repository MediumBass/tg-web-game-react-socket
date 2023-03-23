import React from 'react';
import HPBar from "./HPBar";
import './Monster.css';

const Monster = (props) => {

        return (
            <div className={"Monster"}>
                <img className={"monster__img"} src={props.img} alt={"monster"} ></img>
                <p>{props.name}  {props.currentHP}/ {props.maxhp}</p>
                <HPBar hp={props.currentHP} maxHp={props.maxhp} width={50} />

            </div>
        );


}

export default Monster;