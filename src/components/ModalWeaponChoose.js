import React, {useEffect, useState} from 'react';
import Weapon from "./Weapon";
import {baseURL, socket} from "../socket";
import "../css/ModalWeaponChoose.css"

const ModalWeaponChoose = ({active, setActive, savePlayerStats, addUniSkills}) => {
let currentStats


    const [weaponId, setWeaponId] = React.useState(0);




    const chooseWeapon = (weaponId) =>{
        setWeaponId(weaponId)
    }
    const   postWeapon = (JoinId, JoinMessage) => {
        currentStats=items[weaponId]
        setActive(false)
        socket.emit("WEAPON SUBMITTED",{IdOfWeapon : JoinId, joinMessage: JoinMessage})

        savePlayerStats(currentStats)
        addUniSkills(weaponId)

    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(baseURL+"/weapons")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.weapons);
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
            <div className={active ? "modal active" : "modal"}>
                <div className="modal__content">
                    <div>
                        {items.map(item => (
                            <Weapon key={item.name} name={item.name} desc={item.desc} img={item.img} id={item.id}
                                    chooseWeapon={chooseWeapon}/>
                        ))}
                    </div>

                    <button className="button89"
                        onClick={() => postWeapon(items[weaponId].id, "joined lobby as " + items[weaponId].name)}> Choose {items[weaponId].name}</button>

                </div>
            </div>
        );
    }
};

export default ModalWeaponChoose;
