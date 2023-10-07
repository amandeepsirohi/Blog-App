import {Outlet} from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div>
      <div>
      <Header/>
      </div>
      <div>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}