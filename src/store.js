export default class store{
    constructor(){
        this._monsters =[
            {id:0,  name:'Goblin',hp:20, dmg:4, arm:0, skr:2, crt: 0.1, lvl:1,
                img:'Basic hit, nothing special'},
            {id:1,  name:'Ork',hp:40, dmg:5, arm:2, skr:0, crt: 0.1, lvl:2,
                img:'Basic hit, nothing special'}
        ]
    }
    setMonsters(monsters){
        this._monsters = monsters
    }
    get monsters(){
        return this._monsters
    }
}