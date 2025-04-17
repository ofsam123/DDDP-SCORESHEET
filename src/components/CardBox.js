function CardBox({ name, icon, counter }) {
    return (
        <div className="info-stats4">
            <div className="info-icon">
                <i className={icon}></i>
            </div>
            <div className="sale-num">
                <h3>{counter}</h3>
                <p>{name}</p>
            </div>
        </div>
    );
}

export default CardBox;