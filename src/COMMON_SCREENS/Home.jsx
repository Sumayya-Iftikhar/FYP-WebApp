import React from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';


const Home = (props) => {

    const handlebutton = async (actor) => {
        await localStorage.setItem('userRole', JSON.stringify(actor));
        props.history.push('/login/')
    }


    const styles = {
        buttonStyling: {
            width: '20%',
            fontSize: 20,
            fontFamily: 'sans-serif'
        }
    }

    return (
        <>
            <div id="main_header"
                className="container-fluid">
                <div id="header"
                    className="col-md-10">
                    <div className="row tab-center"
                        style={{ padding: "10%" }}>
                        <h2>FrameWork For Dengue Surveillence and Data Collection In Pakistan</h2>
                        <h4 className="my-2" >
                            (saving valuable lives and shielding Pakistan from dengue Virus)
                        </h4>
                    </div>
                    <div style={
                        {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            paddingLeft: 20,
                            paddingRight: 20
                        }
                    }>

                        <Button
                            variant="outline-primary"
                            size="lg"
                            type="submit"
                            onClick={() => handlebutton('admin')}
                            style={styles.buttonStyling}
                        >
                            ADMIN
                        </Button>

                        <Button
                            variant="outline-primary"
                            size="lg"
                            type="submit"
                            onClick={() => handlebutton('doctor')}
                            style={styles.buttonStyling}
                        >
                            DOCTOR
                         </Button>

                        <Button
                            variant="outline-primary"
                            size="lg"
                            type="submit"
                            onClick={() => handlebutton('researcher')}
                            style={styles.buttonStyling}
                        >
                            RESEARCHER
                         </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Home);


