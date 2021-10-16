import React, {useState, useEffect, Component} from 'react'
import BpkCard from 'bpk-component-card';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkButton from 'bpk-component-button';

import BpkModal from 'bpk-component-modal';
import { BpkNavigationBarButtonLink } from 'bpk-component-navigation-bar';

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

export const Flights = (props) => {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    var popup = true;
    var legInd;

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

    const getLegInd = (element, index) => {
      data.legs.find(
        function(item, i) {
          if(item.id === element.legs[index]) {
            legInd = i;
            return;
          }
        }
      )
    }

    const getInitTime = (ind) => {
      let res =  data.legs[ind].departure_time.split('T');
      return res[res.length - 1];
    } 

    const getEndTime = (ind) => {
      let res =  data.legs[ind].arrival_time.split('T');
      return res[res.length - 1];
    } 

    const calcTime = (minutes) => {
      const hours = Math.floor(minutes/60);
      minutes %= 60;

      return `${hours}H ${minutes}`
    }

    const onOpenPopup = () =>{
      popup = true;
    }

    const onClosePopup = () =>{
      popup = false;
    }

    useEffect(() => {
        getData(props.file)
        
    }, [])

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div>
          { data.itineraries.map((element, index) => (
            <BpkCard style={{margin: '1rem'}}>
              {/* Leg 0 */}
              {getLegInd(element, 0)}
              <div style={{display:'flex', flexDirection:'row'}}>
                {/* Departure */}
                <div style={{display: 'flex', flexDirection:'column'}}>
                  {getInitTime(legInd)}
                  <p>
                    {data.legs[legInd].departure_airport}
                  </p>
                </div>
                <AlignedArrowIcon style={{margin:'0 1rem 0 1rem'}}/>
                
                {/* Arrival */}
                <div style={{display: 'flex', flexDirection:'column'}}>
                  {getEndTime(legInd)}
                  <p>
                    {data.legs[legInd].arrival_airport}
                  </p>
                </div>

                {/* Time */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginLeft:'auto',
                  marginTop:'auto',
                  marginBottom: '1rem'
                }}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    {calcTime(data.legs[legInd].duration_mins)}
                    {
                      data.legs[legInd].stops === 0 ?
                      <p>Direct</p>:
                      <p>{data.legs[legInd].stops} Stop</p>
                    }
                  </div>
                </div>
              </div>

              {/* Leg 1 */}
              {getLegInd(element, 1)}
              <div style={{display:'flex', flexDirection:'row'}}>
                {/* Departure */}
                <div style={{display: 'flex', flexDirection:'column'}}>
                  {getInitTime(legInd)}
                  <p>
                    {data.legs[legInd].departure_airport}
                  </p>
                </div>
                <AlignedArrowIcon style={{margin:'0 1rem 0 1rem'}}/>
                
                {/* Arrival */}
                <div style={{display: 'flex', flexDirection:'column'}}>
                  {getEndTime(legInd)}
                  <p>
                    {data.legs[legInd].arrival_airport}
                  </p>
                </div>

                {/* Time */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginLeft:'auto',
                  marginTop:'auto',
                  marginBottom: '1rem'
                }}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    {calcTime(data.legs[legInd].duration_mins)}
                    {
                      data.legs[legInd].stops === 0 ?
                      <p>Direct</p>:
                      <p>{data.legs[legInd].stops} Stop</p>
                    }
                  </div>
                </div>
              </div>
                
              <div style={{
                display:'flex',
                flexDirection:'row',
                marginTop:'2rem',
              }}>
                <div style={{display:'flex', flexDirection:'column'}}>
                  {/* Price */}
                  <div style={{fontSize:'20px'}}>{element.price}</div>  
                  {/* Agent */}
                  <p>{element.agent}</p>
                </div>
                {/* Submit */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginLeft:'auto',
                  marginTop:'auto',
                  marginBottom: '1rem'
                }}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                  <BpkButton iconOnly>
                    <AlignedArrowIcon />
                  </BpkButton>
                  </div>
                </div>
              </div>
            </BpkCard>
          ))}
        </div>
    )
}
