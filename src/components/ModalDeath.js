import React from 'react';
import "../css/ModalWeaponChoose.css"
const ModalDeath = (props) => {

    return (

        <div className={props.active ? "modal active" : "modal"}>
            <div className="modal__content">
                <b>You Died</b>
                <p>You dealt {props.AllTimeDamage} damage before you died  </p>
                <p>Now you can leave or remain as spectator</p>
                <button className="button89" onClick={() =>props.becomeSpectator()}>Spectate</button>
            </div>
        </div>
    );
};

export default ModalDeath;