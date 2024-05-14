import './App.css'
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import LoginForm from './components/Login';
import SignupForm from './components/Signup'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <SignupForm />
    },
    {
      path: '/login',
      element: <LoginForm />
    },
    {
      path: '/employees/add',
      element: <AddEmployee />

    }, {
      path: '/employee/:id/edit',
      element: <EditEmployee />
    }
  ]);
  return (

    <RouterProvider router={routes} />
  )
}

export default App
