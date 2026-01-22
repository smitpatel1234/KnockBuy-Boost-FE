
import EmptyCartState from '@/components/organisms/cart/EmptyCartState'
export function SheetForcart() { 
  return (
    <div >
        <aside className="w-24 flex flex-col absolute top-0 right-0 z-1000" >
      <div className="px-6 py-4 text-xl font-semibold border-b border-gray-700">
        My App
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Users
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Orders
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          Settings
        </a>
      </nav>

      <div className="px-4 py-4 border-t border-gray-700">
        <button className="w-full px-4 py-2 text-left rounded hover:bg-gray-700">
          Logout
        </button>
      </div>
    </aside>
  </div>

  );
}
