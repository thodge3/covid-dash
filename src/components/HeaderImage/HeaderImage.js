import React from 'react';
import coronaImage from '../../images/image.png';
import { useSpring, animated } from 'react-spring';
// import Container from 'react-bootstrap/Container';


import styles from '../../App.module.css';

const HeaderImage = () => {

    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 15, tension: 500, friction: 40 } }))
    const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
    const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    return (
        <div>
            <animated.div
                onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: props.xys.interpolate(trans) }}
            >
                <img src={coronaImage} className={styles.image} alt='COVID-19' />
            </animated.div>
        </div>
    );
}

export default HeaderImage;