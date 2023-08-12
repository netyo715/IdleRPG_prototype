import React from 'react'
import {tauri} from '@tauri-apps/api';

const getNextTurn = async () => {
    return await tauri.invoke<number>("next_turn");
}

const initBattle = async () => {
    await tauri.invoke("init_battle");
}

const closeBattle = async () => {
    console.log("close");
    await tauri.invoke("close_battle");
}

const isValid = async () => {
    return await tauri.invoke<boolean>("is_valid");
}

const battleAction = async () => {
    isValid().then(is_valid => {
        if (is_valid){
            console.log("battle");
            getNextTurn().then(interval => {
                setTimeout(battleAction, interval);
            });
        }
    });
}

const startBattle = async () => {
    console.log("start");
    isValid().then(is_valid => {
        if (!is_valid){
            initBattle()
            console.log("init")
            getNextTurn().then(interval => {
                setTimeout(battleAction, interval);
            });
        }
    });
}

const Battle: React.FC = () => {
    return (
        <div style={{height: "100%", flex: "1", background: "lightpink"}}>
            <button onClick={startBattle}>スタート</button>
            <button onClick={closeBattle}>終了</button>
        </div>
    )
}
 
export default Battle