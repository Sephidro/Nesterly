import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { Contacts } from './components/Contacts';
import { Campaigns } from './components/Campaigns';
import { Settings } from './components/Settings';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
      <Route path="/contacts" element={
        <Layout>
          <Contacts />
        </Layout>
      } />
      <Route path="/campaigns" element={
        <Layout>
          <Campaigns />
        </Layout>
      } />
      <Route path="/settings" element={
        <Layout>
          <Settings />
        </Layout>
      } />
    </Routes>
  );
}