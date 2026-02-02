"use client";

import { useAppSelector } from "@/redux/store";
import CartSidebar from "@/components/organisms/cart/CartSidebar";

export default function PublicLayoutContent({ children }: { readonly children: React.ReactNode }) {
    const { items } = useAppSelector((state) => state.cart);
    const showSidebar = items.length > 0;

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <main className={`flex-1 transition-[width] duration-300 ${showSidebar ? "max-w-[calc(100%-355px)]" : "max-w-7xl mx-auto"}`}>
                <div className="px-4 py-6">
                    {children}
                </div>
            </main>

            {showSidebar && (
                <aside className="w-[250px] shrink-0 border-l hidden md:block">
                    <CartSidebar />
                </aside>
            )}
        </div>
    );
}
