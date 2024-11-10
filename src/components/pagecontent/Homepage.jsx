import React, {useEffect, useRef} from 'react';
import Header from '../sharedlayout/Header.jsx';
import { gsap } from 'gsap';
import '../Css/Homepage.css'

function HomePage() {
    const homeRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            homeRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: 'power4.out' }
        );
    }, []);

    return (
        <div>
            <Header/>
            <div ref={homeRef} className="home">
                <h1>This is the Homepage!</h1>
            </div>
        </div>
    );
}

export default HomePage;
