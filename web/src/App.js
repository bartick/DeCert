import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {
  Landing,
  SignIn,
  User,
  Business,
  NotFound
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="user" element={<User />} />
        <Route path="business" element={<Business />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
