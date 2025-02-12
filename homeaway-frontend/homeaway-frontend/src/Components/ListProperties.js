import React, { useEffect, useState } from 'react'
import apiServices from '../apiServices/apiServices'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ListProperties() {
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [size, setSize] = useState(10)

    useEffect(()=>{
        const fetchAllProperties = async () => {
            const data = await apiServices.getAllProperties(page, size)
            setProperties(data.content)
            setTotalPages(data.totalPages)
            // setSize(data.totalPages)
        }

        fetchAllProperties()
    },[page,size])

    console.log(properties)
  return (
    <div>
            <h1 style={{marginTop:"5rem"}}>Listed Properties</h1>
        <div class="properties-container container" >
        <TableContainer component={Paper}>
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Property Name</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Rent</TableCell>
            <TableCell align="center">Owner ID</TableCell>
            <TableCell align="center">Facilities</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {properties.length > 0 ? (
            properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell align="center">{property.id}</TableCell>
                <TableCell align="center">{property.name}</TableCell>
                <TableCell align="center">{property.city}</TableCell>
                <TableCell align="center">{property.state}</TableCell>
                <TableCell align="center">{`${property.add1}, ${property.add2}`}</TableCell>
                <TableCell align="center">{property.rent}</TableCell>
                <TableCell align="center">{property.owner}</TableCell>
                <TableCell align="center">
                  {property.facilities.map((facility) => facility.name).join(", ")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No properties available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    <Stack spacing={2} style={{ 'align-items': 'center' , marginTop:"20px"}}>
                    <Pagination count={totalPages} showFirstButton showLastButton page={page + 1}
                        onChange={(event, value) => setPage(value - 1)} />
                </Stack>
    </div>
  )
}
