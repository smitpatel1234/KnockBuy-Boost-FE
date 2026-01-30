import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductCard from "../../src/components/organisms/products/ProductCard";
import { mockProduct, mockProductNoImage, mockProductNoSlug,mockProductNoRaiting  } from "../test_data/product_data";
import { createItemCart } from "../../src/services/cartitem.service";
import { toast } from "sonner";
import { useAppDispatch } from "../../src/redux/store";
import { Button } from "@/components/ui/button";

// Mock the FallBackImage asset
jest.mock("../../../assets/dummy-product-placeholder.avif", () => ({
    src: "/mock-fallback-image.jpg",
    height: 100,
    width: 100,
    blurDataURL: "data:image/jpeg;base64,mock"
}), { virtual: true });

// Mock standard hooks and components
jest.mock("next/link", () => {
    const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
    MockLink.displayName = "Link";
    return MockLink;
});

// Mock next/images
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt ?? "mock-image"} />;
    },
}));

// Mock hooks
const mockToggleWishlist = jest.fn();
const mockIsItemInWishlist = jest.fn();

jest.mock("../../src/hooks/useWishlist", () => ({
    useWishlist: () => ({
        toggleWishlist: mockToggleWishlist,
        isItemInWishlist: mockIsItemInWishlist,
    }),
}));

const mockDispatch = jest.fn();
jest.mock("../../src/redux/store", () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock("../../src/services/cartitem.service", () => ({
    createItemCart: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../src/redux/features/cart-slice", () => ({
    fetchCart: jest.fn(),
}));

jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        message: jest.fn(),
    },
}));

describe("ProductCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockIsItemInWishlist.mockReturnValue(false); // Default: item not in wishlist
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    it("should render product details correctly", () => {
        render(<ProductCard product={mockProduct} />);

        // Check product name
        expect(screen.getByText(mockProduct.item_name)).toBeInTheDocument();

        // Check category name
        expect(screen.getByText(mockProduct.category_name ?? "")).toBeInTheDocument();

        // Check price (formatted with currency symbol)
        expect(screen.getByText(`₹${String(mockProduct.item_price)}`)).toBeInTheDocument();

        // Check image
        const image = screen.getByAltText(mockProduct.item_name);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockProduct.image_url);
    });

    it("should render fallback image when image_url is missing", () => {
        render(<ProductCard product={mockProductNoImage} />);

        const image = screen.getByAltText(mockProductNoImage.item_name);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src");
    });

    it("should render loading state when product has no slug", () => {
        const { container } = render(<ProductCard product={mockProductNoSlug} />);
        // Should not render product name
        expect(screen.queryByText(mockProduct.item_name)).not.toBeInTheDocument();
        // Should find the loader (checking for svg presence)
        expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("button test for specific props", () => {
        const buttonElement = render(<Button variant="default" size="default" asChild={true}>Test Button</Button>);
        expect(buttonElement).toBeDefined();
    });

    it("should toggle wishlist when heart icon is clicked", () => {
        render(<ProductCard product={mockProduct} />);
        const addBtn = screen.getByText("Add").closest("button");
        const buttons = screen.getAllByRole("button");
        const wishlistBtn = buttons.find(btn => btn !== addBtn);
        if (wishlistBtn) {
            fireEvent.click(wishlistBtn);
            expect(mockToggleWishlist).toHaveBeenCalledWith(mockProduct.item_id);
        } else {
            throw new Error("Wishlist button not found");
        }
    });

    it("should show valid heart icon style when item is in wishlist", () => {
        mockIsItemInWishlist.mockReturnValue(true);
        render(<ProductCard product={mockProduct} />);
         
        const addBtn = screen.getByText("Add").closest("button");
        const buttons = screen.getAllByRole("button");
        const wishlistBtn = buttons.find(btn => btn !== addBtn);

        expect(wishlistBtn).toHaveClass("text-red-500");
    });
    it("should show invalid heart icon style when item is not in wishlist", () => {
        mockIsItemInWishlist.mockReturnValue(false);
        render(<ProductCard product={mockProduct} />);
        const addBtn = screen.getByText("Add").closest("button");
        const buttons = screen.getAllByRole("button");
        const wishlistBtn = buttons.find(btn => btn !== addBtn);
        expect(wishlistBtn).toHaveClass("text-gray-400");

    });
     it("should call AddToCart when Add button is clicked and faild ", async () => {
        (createItemCart as jest.Mock).mockRejectedValueOnce(new Error("Failed to add to cart or out of stock"));
        render(<ProductCard product={mockProduct} />);
        const addToCartBtn = screen.getByText("Add");
        fireEvent.click(addToCartBtn);
        await waitFor(() => {
            // Check if service was called
            expect(createItemCart).toHaveBeenCalledWith({
                item: mockProduct.item_id,
                quantity: 1
            });
            // Check if dispatch was not called
            expect(mockDispatch).not.toHaveBeenCalled();
            // Check if failure toast was shown
            expect(toast.message).toHaveBeenCalledWith("Failed to add to cart or out of stock");
        });
     });
    it("should call AddToCart when Add button is clicked", async () => {
         jest.useFakeTimers();
        render(<ProductCard product={mockProduct} />);
        
        const addToCartBtn = screen.getByText("Add");
        for(let i=0;i<1000;i++){
        fireEvent.click(addToCartBtn);
         
        }
          jest.advanceTimersByTime(300); 


        await waitFor(() => {
            // Check if service was called
            expect(createItemCart).toHaveBeenCalledWith({
                item: mockProduct.item_id,
                quantity: 1
            });
            // Check if dispatch was called
            expect(mockDispatch).toHaveBeenCalled();
            // Check if success toast was shown
            expect(toast.success).toHaveBeenCalledWith("Added to cart");
        });
    });
    it("should render product without rating", () => {
        render(<ProductCard product={mockProductNoRaiting} />);
        // Check product name
        expect(screen.getByText(mockProductNoRaiting.item_name)).toBeInTheDocument();
    });
});
