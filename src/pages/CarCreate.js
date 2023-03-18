import React, {useState} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
function CarCreate() {
    const [licensePlateNumber, setlicensePlateNumber] = useState('');
    const [model, setmodel] = useState('')
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {
        setIsSaving(true);
        axios.post('https://localhost:7218/api/cars', {
            licesePlateNumber: licensePlateNumber,
            model: model
          })
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Car saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setlicensePlateNumber('')
            setmodel('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Car</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Cars
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="licensePlateNumber">License plate number</label>
                                <input 
                                    onChange={(event)=>{setlicensePlateNumber(event.target.value)}}
                                    value={licensePlateNumber}
                                    type="text"
                                    className="form-control"
                                    id="licensePlateNumber"
                                    name="licensePlateNumber"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="model">Model</label>
                                <input 
                                    value={model}
                                    onChange={(event)=>{setmodel(event.target.value)}}
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    name="model"></input>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Car
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default CarCreate;