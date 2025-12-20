export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow">
      <div></div>

      <div className="flex items-center justify-center gap-12">
        <a href="#services" className="font-medium hover:text-blue-600">
          Services
        </a>
        <a href="#projects" className="font-medium hover:text-blue-600">
          Projects
        </a>
        <a href="#testimonials" className="font-medium hover:text-blue-600">
          Testimonials
        </a>
        <a href="#contact" className="font-medium hover:text-blue-600">
          Contact
        </a>
      </div>
    </nav>
  );
}
