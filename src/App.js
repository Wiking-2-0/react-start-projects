import React from 'react'
import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import CountersList from './pages/countersList/countersList';
import Navigations from './components/navigations';
import Modal from './pages/modal/modal';
import Quiz from './pages/quiz/quiz';
import UsersList from './pages/users/usersList';
import CurrencyConverter from './pages/currencyConverter/currency';
import Photos from './pages/photos/photos';
import SlotMachine from './pages/slotMachine/slotMachine';

const App = () => {
    const pages = [
        {
            name: 'Home', url: '/', exact: true, component: <div className='homepage'>
                <h1>React Projects List Homepage</h1>
                <a href="https://github.com/Wiking-2-0/react-start-projects" target='_blank' rel="noreferrer"><h2>View on Github</h2></a>
            </div>
        },
        {name: 'Counter List', url: '/counter-list', component: <CountersList />},
        {name: 'Modal', url: '/modal', component: <Modal />},
        {name: 'Quiz', url: '/quiz', component: <Quiz />},
        {name: 'Users', url: '/users', component: <UsersList />},
        {name: 'Currency Converter', url: '/currency', component: <CurrencyConverter />},
        {name: 'Photo Collection', url: '/photos', component: <Photos />},
        {name: 'Slot Machine', url: '/slot-machine', component: <SlotMachine />},
    ]

    return (
        <div className='App'>
            <Navigations pages={pages} />

            <Routes>
                {
                    pages.map(({ name, url, component, exact }) => (
                        <Route key={name} exact={exact} path={url} element={component} />
                    ))
                }
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
