import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Guest = (props) => {
    let ID  = props.match.params.id;
    let [data,setData]= useState({});

    useEffect(async()=>{
        await axios.get('https://pyt-node.herokuapp.com/guest/'+ID)
        .then(response=>{
            setData(response.data)
        })
    },[])
    
    return (
        <>
            <h1 style={{textAlign:"center"}}>Guest Info</h1>
            <div className="container">
                <div className="row ">
                    <table  className="table table-striped col-md-6 offset-md-3">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.fullName}</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{data.age}</td>
                            </tr>
                            <tr>
                                <td>D.O.B</td>
                                <td>{data.dob}</td>
                            </tr>
                            <tr>
                                <td>Profession</td>
                                <td>{data.profession}</td>
                            </tr>

                            <tr>
                                <td>No. of Guests</td>
                                <td>{data.numGuest}</td>
                            </tr>

                            <tr>
                                <td>Locality</td>
                                <td>{data.locality}</td>
                            </tr>

                            <tr>
                                <td>Address</td>
                                <td>{data.address}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default Guest
