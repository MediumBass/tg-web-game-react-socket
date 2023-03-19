import React  from 'react';
import HPBar from "./HPBar";
import Avatar from "./Avatar";



const Player = ({item, playersHP}) => {






    return (
        <div>
            <Avatar/>
            <p>{item.name} {playersHP}\{item.hp}</p>
            <HPBar hp={playersHP} maxHp={item.hp} />
        </div>
    );
};

export default Player;