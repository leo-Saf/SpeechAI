// src/components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link href="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/user-history" className="text-white">Min Historia</Link>
        </li>
        <li>
          <Link href="/discussions" className="text-white">Gamla Diskussioner</Link>
        </li>
        <li>
          <Link href="/about" className="text-white">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
