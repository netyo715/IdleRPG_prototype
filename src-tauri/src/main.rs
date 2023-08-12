// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{State, Manager};
use std::sync::Mutex;

struct MyCharacterState{
    spd: usize,
}

struct BattleState{
    is_valid: Mutex<bool>,
}

impl BattleState{
    fn new(is_valid: bool) -> Self {
        Self {
            is_valid: Mutex::new(is_valid)
        }
    }
}

#[tauri::command]
fn next_turn(my_character_state: State<MyCharacterState>) -> Result<usize, String>{
    Ok(my_character_state.spd)
}

#[tauri::command]
fn is_valid(state: State<BattleState>) -> Result<bool, String>{
    let mut is_valid = state.is_valid.lock().unwrap();
    Ok(*is_valid)
}

#[tauri::command]
fn init_battle(state: State<BattleState>) -> Result<(), String>{
    let mut is_valid = state.is_valid.lock().unwrap();
    *is_valid = true;
    Ok(())
}

#[tauri::command]
fn close_battle(state: State<BattleState>) -> Result<(), String>{
    let mut is_valid = state.is_valid.lock().unwrap();
    *is_valid = false;
    Ok(())
}

#[tauri::command]
fn battle_action() -> Result<(), String>{
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app|{
            let my_character_state = MyCharacterState{spd:1000};
            app.manage(my_character_state);
            let battle_state = BattleState::new(false);
            app.manage(battle_state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            next_turn,
            battle_action,
            is_valid,
            init_battle,
            close_battle,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
