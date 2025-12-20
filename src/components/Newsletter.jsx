export default function Newsletter() {
  return (
    <div className="w-full bg-blue-600 py-4">
      <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
        {/* LEFT LINKS */}
        <ul className="flex gap-8 text-white text-sm font-medium">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">Services</li>
          <li className="cursor-pointer hover:underline">Projects</li>
          <li className="cursor-pointer hover:underline">Testimonials</li>
          <li className="cursor-pointer hover:underline">Contact</li>
        </ul>

        {/* RIGHT SUBSCRIBE */}
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-medium">Subscribe Us</span>

          <input
            type="email"
            placeholder="Enter Email Address"
            className="px-4 py-2 rounded-md outline-none text-sm w-56"
          />

          <button className="bg-white text-blue-600 px-5 py-2 rounded-md text-sm font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
