import React from 'react';

/** Component to render all errors */

const ErrorsBlock = (props) => {
    return (
        <>
        <div className="row">
            <div className="col-12">
                <button type="button" className="close" aria-label="Close" onClick={() => props.cleanErrors()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                {props.errors.map((error, key) => {
                    return (
                        <div className="alert alert-danger" role="alert" key={key}>
                            {error}
                        </div>
                    )
                })}

            </div>
        </div>
        </>
    )
}

export default ErrorsBlock;