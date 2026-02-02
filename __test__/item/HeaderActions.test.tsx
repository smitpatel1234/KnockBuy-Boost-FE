import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeaderActions from "../../src/components/organisms/header/HeaderActions";
import { user } from '../test_data/user_data'

describe("HeaderActions", () => {
  it("should render user profile with username when user is logged in", () => {
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={10}
        wishlistCount={5}
        loading={false}
        user={user}
      />,
    );
    expect(screen.getByText(user.username)).toBeInTheDocument();
    expect(screen.getByTitle("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
  });
  it("should render username initial when profile image is missing", () => {
    const userWithoutImage = { ...user, profile_image: "" };
    
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={5}
        wishlistCount={3}
        loading={false}
        user={userWithoutImage}
      />,
    );
    expect(screen.getByText(userWithoutImage.username)).toBeInTheDocument();
    const initial = userWithoutImage.username.charAt(0);
    expect(screen.getByText(initial)).toBeInTheDocument();
  });

  it("should render loading spinner when loading is true", () => {
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={0}
        wishlistCount={0}
        loading={true}
        user={null}
      />,
    );
    
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Logout")).not.toBeInTheDocument();
  });

  it("should render Sign In link when user is not logged in", () => {
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={0}
        wishlistCount={0}
        loading={false}
        user={null}
      />,
    );
    
    // Check if Sign In link exists
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    
    // Check if logout button does NOT exist
    expect(screen.queryByTitle("Logout")).not.toBeInTheDocument();
    
    // Check if username does NOT exist
    expect(screen.queryByText(user.username)).not.toBeInTheDocument();
  });

  // Test 5: Cart count badge appears only when count > 0
  it("should show cart count badge when cartCount > 0", () => {
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={5}
        wishlistCount={0}
        loading={false}
        user={null}
      />,
    );
    
    // Check if cart count badge is visible
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  // Test 6: Wishlist count badge appears only when count > 0
  it("should show wishlist count badge when wishlistCount > 0", () => {
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={0}
        wishlistCount={3}
        loading={false}
        user={null}
      />,
    );
    
    // Check if wishlist count badge is visible
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // Test 7: Default "U" shown when user exists but no username or profile image
  it("should render default 'U' when user has no username and no profile image", () => {
    const minimalUser = { username: "", profile_image: "", user_id: "123" };
    
    render(
      <HeaderActions
        handleLogout={() => {}}
        cartCount={0}
        wishlistCount={0}
        loading={false}
        user={minimalUser as any}
      />,
    );
    
    // Check if default "U" is shown
    expect(screen.getByText("U")).toBeInTheDocument();
    
    // Check logout button exists (user is logged in)
    expect(screen.getByTitle("Logout")).toBeInTheDocument();
  });
});
