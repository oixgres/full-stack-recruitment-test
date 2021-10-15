import React, {useState, useEffect} from 'react'
import BpkCard from 'bpk-component-card';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkButton from 'bpk-component-button';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export const Flights = (props) => {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);

    const getData=(file)=>{
        fetch(file, {
            headers:{
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then((response)=>{
            console.log(response);
            return response.json();
        })
        .then((json)=>{
            console.log(json);
            setdata(json);
            setloading(false);
        })
    }

    // function find_leg(code) {
    //   return data.filter(
    //       function(data){ return data.code == code }
    //   );
    // }
    
    //var found = getCountryByCode('DZ');
    
    
    useEffect(() => {
        getData(props.file)
        console.log(props.file)
    }, [])

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div>
          { data.itineraries.map((element, index) => (
            <BpkCard style={{margin: '1rem'}}>
              <div>
                {data.legs.find(prueba => prueba.id === element.legs[0]).departure_time}
                <AlignedArrowIcon style={{margin:'0 1rem 0 1rem'}}/>
              </div>
              <p style={{color: 'gray'}}>{data.legs.find(prueba => prueba.id === element.legs[0]).departure_airport}</p>
              <div>
                {data.legs.find(prueba => prueba.id === element.legs[1]).departure_time}
                <AlignedArrowIcon style={{margin:'0 1rem 0 1rem'}}/>
              </div>


              <div style={{display: 'flex', justifyContent:'end'}}>
                <BpkButton iconOnly>
                  <AlignedArrowIcon />
                  <span className="visually-hidden">Search</span>
                </BpkButton>
              </div>
            </BpkCard>
          ))}
        </div>
    )
}
