import { Link } from 'components';

export default function Home() {
  return (
    <div>
      <h1>C& Internal Whitelist Management Dashboard</h1>
      <p>This is a dashboard for internal whitelist management. Please do not share this to other users.</p>
      <p><Link href="/whitelists"> - Manage Whitelists</Link></p>
    </div>
  );
}
