import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { JewelryListItems } from "./JewelryListItems";
import { useWishlistContext } from "../../../contexts/WishlistContext";
import { JewelryCard } from "../../JewelryCard/JewelryCard";
import { JewelryCardHovered } from "../../JewelryCardHovered/JewelryCardHovered";

// Mock useWishlistContext hook
jest.mock("../../../contexts/WishlistContext", () => ({
  useWishlistContext: jest.fn(),
}));

// Mock JewelryCard and JewelryCardHovered components
jest.mock("../../JewelryCard/JewelryCard", () => ({
  JewelryCard: jest.fn(() => <div>JewelryCard Component</div>),
}));

jest.mock("../../JewelryCardHovered/JewelryCardHovered", () => ({
  JewelryCardHovered: jest.fn(() => <div>JewelryCardHovered Component</div>),
}));

describe("JewelryListItems component", () => {
  const mockOnAddToWishlistClick = jest.fn();
  const mockOnRemoveFromWishlistClick = jest.fn();

  beforeEach(() => {
    // Mock the return values of useWishlistContext
    useWishlistContext.mockReturnValue({
      onAddToWishlistClick: mockOnAddToWishlistClick,
      onRemoveFromWishlistClick: mockOnRemoveFromWishlistClick,
    });

    // Clear mock function calls between tests
    jest.clearAllMocks();
  });

  const defaultProps = {
    _id: "1",
    firstImageUrl: "image-url",
    jewelryTitle: "Test Jewelry",
    categoryTitle: "Test Category",
    isLikedByUser: false,
    isSoldOut: false,
    isHovered: false,
    mouseEnterHandler: jest.fn(),
    mouseLeaveHandler: jest.fn(),
    toggleLike: jest.fn(),
    price: 100,
  };

  test("calls mouseEnterHandler on mouse enter", () => {
    render(<JewelryListItems {...defaultProps} />);
    fireEvent.mouseEnter(screen.getByRole("article"));
    expect(defaultProps.mouseEnterHandler).toHaveBeenCalledWith(
      defaultProps._id
    );
  });

  test("calls mouseLeaveHandler on mouse leave", () => {
    render(<JewelryListItems {...defaultProps} />);
    fireEvent.mouseLeave(screen.getByRole("article"));
    expect(defaultProps.mouseLeaveHandler).toHaveBeenCalledWith(
      defaultProps._id
    );
  });
});
