import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiServices from '../apiServices/apiServices'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

export default function PropertyDetails() {
  const { id } = useParams()
  console.log(id)
  const [propertyDetail, setPropertyDetail] = useState({})
  const [userType, setUserType] = useState(useSelector((state)=> state.utype.value))
  useEffect(() => {
    console.log(id)
    console.log("in use effect")
    const fetchProperty = async () => {
      const data = await apiServices.getPropertyById(id)
      setPropertyDetail(data)
      console.log(data)
    }
    fetchProperty()
  }, [id])
  console.log(propertyDetail)

  const navigate = useNavigate();

  const handleDelete = async () =>{
    const data = await apiServices.deleteProperty(id)
    console.log(data)
    if(data){
      navigate('/')
    }
  }
  const handleClick = () => {
    navigate('/booking', { state: {houseId:id }})
  }


  return (
    <div>
      <div class="descmain row" style={{marginTop:"5rem"}}>
        <div class="left">
          <h2>Details</h2>
          <div class="details">
            <div class="det1">
              Name:
              <span>{propertyDetail.name}</span>
            </div>
            <br />
            <div class="det1">
              Rent Amount:
              <span>{propertyDetail.rent}</span>
            </div>
            <br />
            <div class="det1">
              Address Line 1:
              <span>{propertyDetail.add1}</span>
            </div>
            <br />
            <div class="det1">
              Address Line 2:
              <span>{propertyDetail.add2}</span>
            </div>
            <br />
            <div class="det1">
              City:
              <span>{propertyDetail.city}</span>
            </div>
            <br />
            <div class="det1">
              State:
              <span>{propertyDetail.state}</span>
            </div>

          </div>
        </div>
        <div class="right-main">
          <div class="right">
            <h2>Facilities</h2>
            <div class="aminities">
              {propertyDetail.facilities?.map((facility, index) => (
                <div class="acontents">{facility.name}</div>
              ))}
            </div>
          </div>
          {userType==="USER"?(
            <Button variant="outlined" onClick={handleClick}>Book a Visit</Button>
          ):(
          <Button variant="outlined" onClick={handleDelete}>Delete Property</Button>
          )}
        </div>

      </div>

    </div>
  )
}
