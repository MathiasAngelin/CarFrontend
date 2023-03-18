import React,{ useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
  
function CarList() {
    const  [carList, setCarList] = useState([])
  
    useEffect(() => {
        fetchCarList()
    }, [])
  
    const fetchCarList = () => {
        axios.get('https://localhost:7218/api/cars')
        .then(function (response) {
          setCarList(response.data);
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://localhost:7218/api/cars/id?id=${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Car deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchCarList()
                })
                .catch(function (error) {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Car Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-primary"
                            to="/create">Create New Car
                        </Link>
                    </div>
                    <div className="card-body">
              
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>VIN</th>
                                    <th>License plate number</th>
                                    <th>Model</th>
                                    <th>Brand</th>
                                    <th>Equipment</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carList.map((car, key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{car.vin}</td>
                                            <td>{car.licesePlateNumber}</td>
                                            <td>{car.model}</td>
                                            <td>{car.equipment}</td>
                                            <td>{car.brand}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${car.vin}`}>
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={()=>handleDelete(car.vin)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default CarList;