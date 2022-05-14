import { Outlet } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
export default function App() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
}
