import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetPortfolio } from '../GetPortfolio/GetPortfolio';
import { GetWorkers } from '../GetWokers/GetWorkers';
import { UpdateProfile } from '../UpdateProfile/UpdateProfile';
import { Appointments } from '../Appointments/Appointments';  
import { CreateAppointment } from '../CreateAppointment/CreateAppointment';
import { UpdateAppointment } from '../UpdateAppointment/UpdateAppointment';
import { GetAllUsers } from '../GetAllUsers/GetAllUsers';
import { GetAllAppointments } from '../GetAllAppointments/GetAllAppointments';
import { Products } from '../Products/Products';
import { ProductsAdmin } from '../ProductsAdmin/ProductsAdmin';
import { Hero } from '../../common/Hero/Hero';
import {Inchiostro} from '../Inchiostro/Inchiostro';

import {Cleaning} from '../Cleaning/Cleaning';
import {Macchinette} from '../Macchinette/Macchinette';
import {Accessori} from '../Accessori/Accessori';
import ProductDetail from '../ProductDetail/ProductDetail';
import Cart from '../Cart/Cart.jsx';
import InfoPage from '../InfoPage/InfoPage.jsx';

export const Body = () => {
     return (
             <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/shop" element={<Products />}/> 
                <Route path="/cart" element={<Cart />}/> 
                
                <Route path="/profile" element={<Profile />}/>
                <Route path="/createAppointment" element={<CreateAppointment />}/>
                <Route path="/updateAppointment" element={<UpdateAppointment />}/>
                <Route path="/getAllUsers" element={<GetAllUsers />}/>
                <Route path="/getAllAppointments" element={<GetAllAppointments />}/>
                <Route path='/inchiostro' element = {<Inchiostro />}></Route>
                <Route path='/macchinette' element = {<Macchinette />}></Route>
                <Route path='/product-detail' element = {<ProductDetail />}></Route>
                <Route path='/cleaning' element = {<Cleaning />}></Route>
                <Route path='/info' element = {<InfoPage />}></Route>
            
            </Routes>
         </>
     )
}