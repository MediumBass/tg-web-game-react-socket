const a=1;
const avatarki =["ffff","dddddd","aaaaaaa","qqqqq"]
const imenaIgrokov=["Вовичк","Сесис","Маха","Некит"]
const weapons = [
    {id:0,name:"shield",hp:100, dmg:3, arm:4, spd:1, crt: 0.1,
        desc:"The shield and the sword \n High armor and hp, but low dmg and agility",img:"https://www.wistedt.net/wp-content/uploads/2019/06/fighter_mace.png"},
    {id:1,name:"knife",hp:50, dmg:2, arm:2, spd:4, crt: 0.35,
        desc:"Small but deadly knife \n High crit chance and agility, but very low hp",img:"https://static.vecteezy.com/system/resources/previews/007/147/670/original/medieval-dagger-linear-icon-double-edged-small-pointed-knife-weapon-for-medieval-knight-personal-protection-thin-line-illustration-contour-symbol-isolated-outline-drawing-editable-stroke-vector.jpg"}
]
const team = [
    {id:0, weaponId: weapons[a].id,weapon:weapons[a].name,hp:weapons[a].hp, dmg:weapons[a].dmg, arm:weapons[a].arm,
        spd:weapons[a].spd, crt: weapons[a].crt,
        img:avatarki[0], playerName: imenaIgrokov[0], isActive: 1}
]

const weaponSkills =[
    {id:0, classId: 0, name:'tychka', dmg:'team[playerId].dmg', cd:1, price:0, needTarget:0,
        desc:'Basic hit, nothing special'},
    {id:1, classId: 0, name:'Shield Bash', dmg:'team[playerId].arm', cd:3, price:1, needTarget:0,
        desc:'Deal Damage based on your Armor'},
    {id:2, classId: 0, name:'Cover', dmg:'team[chosenId].arm+team[playerId].arm', cd:1, price:0, needTarget:1,
        desc:'Cover chosen teammate with your shield'}
]

export {weapons};