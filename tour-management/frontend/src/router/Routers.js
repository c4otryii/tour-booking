import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import ThankYou from '../pages/ThankYou';
import Payment from '../components/Booking/Payment';

const Routers = () => {
        return (
                <Routes>
                        <Route path='/' element={<Navigate to='/home'></Navigate>} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/tours' element={<Tours />} />
                        <Route path='/tours/:id' element={<TourDetails />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/thank-you' element={<ThankYou />} />
                        <Route path='/tours/search' element={<SearchResultList />} />
                        <Route path='/payment' element={<Payment />} />
                </Routes>
        )
}

export default Routers