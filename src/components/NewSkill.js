import React from 'react';
import "../css/NewSkill.css"
let color
const NewSkill = ({skill, chooseSkill,colors}) => {
color = colors[skill.price]
    return (
        <div className={"newSkill"} onClick={()=> chooseSkill(skill.id)} style={{fontSize:12}}>
            <b style={{color:color}}>{skill.name}</b>
            <p>{skill.desc}</p>
        </div>
    );
};

export default NewSkill;