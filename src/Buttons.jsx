import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

const Buttons = (props) => {
    return (
        <div id="btn"
            className="col-md-3 col-9 mx-md-5 my-1">
            <NavLink id={props.id} to={props.navigate}
                type={props.type}
                className="btn btn-outline-info btn-lg text-info"  >
                {props.name}

            </NavLink>

        </div>
    );
};

export default Buttons;