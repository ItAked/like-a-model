import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useOutletContext } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import StoriesPage from './pages/StoriesPage.jsx';
import StartJourneyPage from './pages/StartJourneyPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import './styles/index.css';

function HomeRoute() {
  const { onOpenBooking } = useOutletContext();
  return <HomePage onOpenBooking={onOpenBooking} />;
}

function StoriesRoute() {
  const { onOpenBooking } = useOutletContext();
  return <StoriesPage onOpenBooking={onOpenBooking} />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route element={<App />}>
        <Route index element={<HomeRoute />} />
        <Route path="stories" element={<StoriesRoute />} />
        <Route path="start-your-journey" element={<StartJourneyPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
