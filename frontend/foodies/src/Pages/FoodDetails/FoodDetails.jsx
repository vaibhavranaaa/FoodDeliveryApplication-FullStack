import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchFoodDetails } from '../../service/foodservice'
import { toast } from 'react-toastify'
import {StoreContext} from '../../context/StoreContext';

const FoodDetails = () => {
    const { id } = useParams()
    const{increaseQty}=useContext(StoreContext);
    const navigate=useNavigate();


    const [data, setData] = useState(null)

    useEffect(() => {
        const loadFoodDetails = async () => {
            try {
                const food = await fetchFoodDetails(id)
                setData(food)
            } catch (e) {
                toast.error('Error displaying the food details.')
            }
        }
        loadFoodDetails()
    }, [id]);

    const addToCart=()=>{
        increaseQty(data.id);
        navigate('/cart');
    }

    if (!data) return null

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-5">
                        <img src={data.imageUrl} alt={data.name} className="card-img-top" />
                    </div>
                    <div className="col-md-6">
                        <div className="fs-5 mb-1">
                            Category: <span className="badge text-bg-warning">{data.category}</span>
                        </div>
                        <h1 className="display-5 fw-bolder">{data.name}</h1>
                        <div className="fs-5 mb-2">₹{data.price}.00</div>
                        <p className="lead">{data.description}</p>
                        <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={addToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FoodDetails
