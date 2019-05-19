import React from 'react';
import "./loader.css";

const Loader = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div id="spinner" className="col-12 d-flex justify-content-center align-items-center">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </div>

    )
}

export default Loader;