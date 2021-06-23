import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Guestlist = () => {

    let history = useHistory();

    let [guestData,setGuestData] = useState([]);
    let [search, setSearch] = useState('');

    const handleChange = e => {
        setSearch(e.target.value);

    };

    let filteredGuest = guestData.filter(guest =>
       {return( guest.fullName.toLowerCase().includes(search.toLowerCase()) || guest.locality.toLowerCase().includes(search.toLowerCase()) )}
    );
    
    useEffect(async ()=>{
        await axios.get('https://pyt-node.herokuapp.com/guest')
        .then((response)=>{
            setGuestData(response.data);
        })
    },[])

    return (
        <>
            <div className='container' style={{ marginTop: "5em" }}>
                <div className='row col-12 col-md-8 offset-md-2'>

                    <input type="text" class="form-control" placeholder="Search" onChange={handleChange} />
                </div>

                <div className='row' style={{ marginTop: "4em" }} >

                    <table class="table table-hover" style={{ textAlign: "center" }}>
                        <thead class="thead-dark table-borderless" style={{ position: "sticky", top: "0" }}>
                            <tr>
                                <th >Name</th>
                                <th className="d-none d-sm-table-cell">Age</th>
                                <th className="d-none d-sm-table-cell">DOB</th>
                                <th>Profession</th>
                                <th className="d-none d-sm-table-cell">NO. of Guest</th>
                                <th>Locality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredGuest.map((data) => {
                                    return (
                                        <tr style={{ cursor: "pointer" }} onClick={()=>{
                                            history.push('/guest/'+data._id)
                                        }} >
                                            <td>{data.fullName}</td>
                                            <td className="d-none d-sm-table-cell">{data.age} </td>
                                            <td className="d-none d-sm-table-cell">{data.dob}</td>
                                            <td>{data.profession}</td>
                                            <td className="d-none d-sm-table-cell">{data.numGuest}</td>
                                            <td>{data.locality}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        </>

    )
}

export default Guestlist
