/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Info from './'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
        axios.get('/getSearch', { params: })
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToUser = (id) => {    // ref
        navigate('/user/' + id)
    }
    
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }
    console.log("restaurants");
    console.log(restaurants);
    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    // TODO Part I-2: search page front-end
                        <div className= 'resBlock' id={item.id} key={item.id}>
                            <div className='reslmgContainer'>
                                <img className='reslmg' src={item.img}/>
                            </div>
                            <div className='resInfo'> 
                                <div className='title'>
                                    <p className='name'>{item.name}</p>
                                    <p className='price'> {getPrice(item.price)}</p>
                                    <p className='distance'>{item.distance/1000} </p>
                                </div>
                                <p className='description'>{item.tag.join(', ')} </p>
                            </div>
                        </div>
                ))
            }
        </div>
    )
}
export default SearchPage