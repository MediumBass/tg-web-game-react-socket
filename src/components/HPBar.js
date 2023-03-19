

const HpBar = (props) => {
    const barWidth = (props.hp / props.maxHp) * 100;

    return (
        <div>
            <div class="health-bar" style={{width: props.width}}>
                <div class="bar" style={{ width: `${barWidth}%` }}></div>
                <div class="hit" style={{ width: `${0}%` }}></div>

                <div
                    style={{
                        position: "absolute",
                        top: "5px",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        color: "black"
                    }}
                >

                </div>
            </div>

            <br />
        </div>
    );
};





export default HpBar;