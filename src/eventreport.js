import React,{useEffect,useState} from 'react'
import axios from 'axios';


const Eventreport = () => {
    let [guestData,setGuestData] = useState([]);
    let [locality,setLocality]= useState([])
    let [age13,setAge13] = useState(0);
    let [age18,setAge18] = useState(0);
    let [age25,setAge25] = useState(0);
    let [guestCount,setGestCount] = useState(0);
    let [guestNum,setGuestNum] = useState(0)
    let [studentCont,setStudentCount] = useState(0);
    let [professionalCount,setProfessionalCount] = useState(0)




    useEffect(async ()=>{
        await axios.get('https://pyt-node.herokuapp.com/guest')
        .then((response)=>{
            let data = response.data;
            let tempLoc = [];
            let ageth = 0;
            let ageet = 0;
            let agetw = 0;
            let groupSize = 0;
            let stud = 0;
            let pro = 0

            for(var k = 0;k<data.length;k++){
                
                if(data[k].profession=="Student"){
                    stud++;
                }
                else{
                    pro++
                }

                groupSize= groupSize+data[k].numGuest;

                if(data[k].age>=13 && data[k].age<18){
                    ageth++;
                }
                else if(data[k].age>=18 && data[k].age<25){
                    ageet++;
                }
                else{
                    agetw++
                }

                if(tempLoc.length<=0){
                    tempLoc.push({location:data[k].locality,count:1})
                }
                else{
                    let found = false
                    for(let i = 0;i<tempLoc.length;i++){
                        if(tempLoc[i].location==data[k].locality){
                            tempLoc[i].count++;
                            found=true
                        }
                    }
                    if(found==false){
                        tempLoc.push({location:data[k].locality,count:1})
                    }
                }
            }
            setLocality(tempLoc);
            setAge13(ageth);
            setAge18(ageet);
            setAge25(agetw);
            setGestCount(data.length);
            setGuestNum(groupSize);
            setStudentCount(stud);
            setProfessionalCount(pro);
        })
    },[])   


    return (
       <>
            <div className="container">
                <div className="row">
                    <h1>Event Report</h1>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="container-">
                            <div className="row">
                            <h2>Age Info</h2>
                         </div>
                            <div className="row col-7">
                            <h5>Age 13-18 : {age13}</h5><br/>
                           <h5>Age 18-25 : {age18}</h5>
                           <h5>Age 25+ : {age25}</h5>
                            </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="container-">
                            <div className="row">
                            <h2>Locality Info</h2>
                         </div>
                            <div className="row col-7">
                                {locality.map((data)=>{
                                    return(
                                        <h5>{data.location} : {data.count} </h5>
                                    )
                                })}
                            </div>
                            </div>

                        </div>

                        <div className="row">
                            
                            <h2>Average Group Size : {Math.ceil(guestNum/guestCount)}</h2>
                        

                        </div>

                        <div className="row">
                            <div className="container-">
                            <div className="row">
                            <h2>Profession count</h2>
                         </div>
                            <div className="row col-10">
                               <h5>Student:{studentCont}</h5>
                               <h5>Professional: {professionalCount}</h5>
                            </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

       </>
    )
}

export default Eventreport
