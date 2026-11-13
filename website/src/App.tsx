import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { AboutPage } from '@/pages/About/AboutPage';
import { BookingPage } from '@/pages/Booking/BookingPage';
import { ContactPage } from '@/pages/Contact/ContactPage';
import { FaqPage } from '@/pages/Faq/FaqPage';
import { GalleryPage } from '@/pages/Gallery/GalleryPage';
import { HomePage } from '@/pages/Home/HomePage';
import { PrivacyPage, TermsPage } from '@/pages/Legal/LegalPages';
import { ServiceDetailsPage } from '@/pages/ServiceDetails/ServiceDetailsPage';
import { ServicesPage } from '@/pages/Services/ServicesPage';
import { TeamPage } from '@/pages/Team/TeamPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:serviceId" element={<ServiceDetailsPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
