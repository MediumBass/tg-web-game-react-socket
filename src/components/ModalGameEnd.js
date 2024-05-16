import React, {useEffect, useState} from 'react';
import "../css/ModalWeaponChoose.css"
import {socket} from "../socket";

//0 lose, 1 victory
let img="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Skull-Icon.svg/2048px-Skull-Icon.svg.png"
let message1="GAME OVER"
let message2="Everyone from your party died"
let message3="Press restart and reconnect to the game to do one more run"
const ModalGameEnd = () => {
    const [gameOver, setGameOver] = useState(false)
    const [isVictory, setIsVictory] = useState(1)
    useEffect(() => {
        socket.on("GAME END", (data) => {
            setGameOver(true)
            setIsVictory(data.isVictory)
            console.log(isVictory)
            if(data.isVictory==true){
                message1="CONGRATULATION"
                message2="You`ve managed to successfully complete this dungeon"
                img="https://cdn.discordapp.com/attachments/713472920650776657/1085752389132353576/pngwing.com_15.png"
            }
        })
    }, [])
const onRestart = () =>{
    socket.emit("RESTART")
    setGameOver(false)
}

    return (
        <div className={gameOver ? "modal active" : "modal"}>
            <div className="modal__content">
                <b>{message1}</b>
                <img src={img} alt={"victory"} width={300} />
                <p>{message2}</p>
                <p>{message3}</p>
                <button className="button89" onClick={() =>onRestart()} >Restart</button>
            </div>
        </div>
    );
};

export default ModalGameEnd;