import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import Table from 'react-bootstrap/Table';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';




const Records_Table = (props) => {

    // const handleRowClicked = (name) => {
    //     alert(name)
    // }


    return (
        <>
            <div style={{
                marginBottom: 60
            }}>
                <Table striped bordered hover >
                    <thead style={{ backgroundColor: 'blue', fontSize: 20 }}>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: 20 }}>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr style={{ fontSize: 18 }}>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                {/* <MaterialTable
                    title="Records"
                    data={props.data}
                    columns={props.columns}
                    key={props.data.userName}
                    
                    options={{
                        filtering: true,
                        paging: false,
                        selection: true,
                        headerStyle: {
                            fontSize: 20,
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold'
                        },
                        rowStyle: {
                            fontSize: 16,
                            fontFamily: 'sans-serif'
                        }
                    }}
                /> */}


            </div>
        </>
    );
}


export default Records_Table;