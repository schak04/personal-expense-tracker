import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login(form);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-text">Login</h1>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <input className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="w-full py-2.5 rounded-lg font-medium bg-accent text-surface" type="submit">Login</button>
        <p className="text-sm text-muted">No account? <Link to="/register" className="text-accent">Register</Link></p>
      </form>
    </div>
  );
}
