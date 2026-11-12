import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register(form);
      await authService.login({ username: form.username, password: form.password });
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try a different username.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-text">Register</h1>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <input className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text" type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-text" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        <button className="w-full py-2.5 rounded-lg font-medium bg-accent text-surface" type="submit">Create account</button>
        <p className="text-sm text-muted">Have an account? <Link to="/login" className="text-accent">Login</Link></p>
      </form>
    </div>
  );
}
