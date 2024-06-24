// // import React from "react";
// // import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// // import { BrowserRouter as Router, useParams } from "react-router-dom";
// // import { JewelryItem } from "./JewelryItem";
// // import { useService } from "../../hooks/useService";
// // import { useWishlistContext } from "../../contexts/WishlistContext";
// // import { useBagContext } from "../../contexts/BagContext";

// // // Mocking the dependencies
// // jest.mock("react-router-dom", () => ({
// //   ...jest.requireActual("react-router-dom"),
// //   useParams: jest.fn(),
// // }));
// // jest.mock("../../hooks/useService");
// // jest.mock("../../contexts/WishlistContext");
// // jest.mock("../../contexts/BagContext");
// // jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
// //   LoadingSpinner: () => <div>Loading...</div>,
// // }));
// // jest.mock("../Bag/MiniBag/MiniBag", () => ({
// //   MiniBag: ({ onClose, miniBagRef }) => (
// //     <div ref={miniBagRef} onClick={onClose}>
// //       MiniBag Component
// //     </div>
// //   ),
// // }));
// // jest.mock("../JewelrySuggestion/JewelrySuggestion", () => ({
// //   JewelrySuggestion: ({ jewelryId }) => (
// //     <div>JewelrySuggestion Component for ID: {jewelryId}</div>
// //   ),
// // }));
// // jest.mock("../HorizontalLine/HorizontalLine", () => ({
// //   HorizontalLine: () => <div>HorizontalLine Component</div>,
// // }));

// // describe("JewelryItem component", () => {
// //   const mockJewelryService = {
// //     findOne: jest.fn(),
// //   };
// //   const mockWishlistContext = {
// //     onAddToWishlistClick: jest.fn(),
// //     onRemoveFromWishlistClick: jest.fn(),
// //   };
// //   const mockBagContext = {
// //     onAddToBagClick: jest.fn(),
// //   };

// //   beforeEach(() => {
// //     useParams.mockReturnValue({ _id: "123" });
// //     useService.mockReturnValue(mockJewelryService);
// //     useWishlistContext.mockReturnValue(mockWishlistContext);
// //     useBagContext.mockReturnValue(mockBagContext);
// //     jest.clearAllMocks();
// //   });

// //   test("renders loading spinner initially", () => {
// //     render(
// //       <Router>
// //         <JewelryItem />
// //       </Router>
// //     );

// //     expect(screen.getByText("Loading...")).toBeInTheDocument();
// //   });

// //     test("renders jewelry item details after loading", async () => {
// //       mockJewelryService.findOne.mockResolvedValueOnce({
// //         _id: "123",
// //         title: "Test Jewelry",
// //         firstImageUrl: "test-image-1.jpg",
// //         secondImageUrl: "test-image-2.jpg",
// //         isSoldOut: false,
// //         price: 100,
// //         isLikedByUser: false,
// //         category: 1,
// //         sizes: [{ _id: 1, measurement: "6.98", available: true }],
// //       });

// //       render(
// //         <Router>
// //           <JewelryItem />
// //         </Router>
// //       );

// //       await waitFor(() => {
// //         expect(screen.getByTestId("jewelry-title")).toBeInTheDocument()
// //         expect(screen.getByTestId("jewelry-title")).toHaveTextContent("Test Jewelry")
// //         // expect(screen.getByText("Test Jewelry")).toBeInTheDocument();
// //         // expect(screen.getByAltText("Test Jewelry")).toHaveAttribute("src", "test-image-1.jpg");
// //       });
// //     });

// //   //   test("toggles like status on heart icon click", async () => {
// //   //     mockJewelryService.findOne.mockResolvedValueOnce({
// //   //       _id: "123",
// //   //       title: "Test Jewelry",
// //   //       firstImageUrl: "test-image-1.jpg",
// //   //       secondImageUrl: "test-image-2.jpg",
// //   //       isSoldOut: false,
// //   //       price: 100,
// //   //       isLikedByUser: false,
// //   //       category: 1,
// //   //       sizes: [{ _id: 1, measurement: "S", available: true }],
// //   //     });

// //   //     render(
// //   //       <Router>
// //   //         <JewelryItem />
// //   //       </Router>
// //   //     );

// //   //     await waitFor(() => {
// //   //       expect(screen.getByText("Test Jewelry")).toBeInTheDocument();
// //   //     });

// //   //     const heartIcon = screen.getByRole("button", { name: /heart/i });
// //   //     fireEvent.click(heartIcon);

// //   //     await waitFor(() => {
// //   //       expect(mockWishlistContext.onAddToWishlistClick).toHaveBeenCalledWith("123");
// //   //     });
// //   //   });

// //   //   test("handles Add to Bag click", async () => {
// //   //     mockJewelryService.findOne.mockResolvedValueOnce({
// //   //       _id: "123",
// //   //       title: "Test Jewelry",
// //   //       firstImageUrl: "test-image-1.jpg",
// //   //       secondImageUrl: "test-image-2.jpg",
// //   //       isSoldOut: false,
// //   //       price: 100,
// //   //       isLikedByUser: false,
// //   //       category: 1,
// //   //       sizes: [{ _id: 1, measurement: "S", available: true }],
// //   //     });

// //   //     render(
// //   //       <Router>
// //   //         <JewelryItem />
// //   //       </Router>
// //   //     );

// //   //     await waitFor(() => {
// //   //       expect(screen.getByText("Test Jewelry")).toBeInTheDocument();
// //   //     });

// //   //     const addToBagButton = screen.getByText(/Add to Bag/i);
// //   //     fireEvent.click(addToBagButton);

// //   //     await waitFor(() => {
// //   //       expect(mockBagContext.onAddToBagClick).toHaveBeenCalled();
// //   //     });
// //   //   });

// //   //   test("displays error message when size is not selected", async () => {
// //   //     mockJewelryService.findOne.mockResolvedValueOnce({
// //   //       _id: "123",
// //   //       title: "Test Jewelry",
// //   //       firstImageUrl: "test-image-1.jpg",
// //   //       secondImageUrl: "test-image-2.jpg",
// //   //       isSoldOut: false,
// //   //       price: 100,
// //   //       isLikedByUser: false,
// //   //       category: 1,
// //   //       sizes: [{ _id: 1, measurement: "S", available: true }],
// //   //     });

// //   //     render(
// //   //       <Router>
// //   //         <JewelryItem />
// //   //       </Router>
// //   //     );

// //   //     await waitFor(() => {
// //   //       expect(screen.getByText("Test Jewelry")).toBeInTheDocument();
// //   //     });

// //   //     const addToBagButton = screen.getByText(/Add to Bag/i);
// //   //     fireEvent.click(addToBagButton);

// //   //     await waitFor(() => {
// //   //       expect(screen.getByText("Ensure you have selected the desired size")).toBeInTheDocument();
// //   //     });
// //   //   });
// // });

// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import { BrowserRouter as Router, useParams } from "react-router-dom";
// import { JewelryItem } from "./JewelryItem";
// import { useService } from "../../hooks/useService";
// import { useWishlistContext } from "../../contexts/WishlistContext";
// import { useBagContext } from "../../contexts/BagContext";

// // Mocking the dependencies
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useParams: jest.fn(),
// }));
// jest.mock("../../hooks/useService");
// jest.mock("../../contexts/WishlistContext");
// jest.mock("../../contexts/BagContext");
// jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
//   LoadingSpinner: () => <div>Loading...</div>,
// }));
// jest.mock("../Bag/MiniBag/MiniBag", () => ({
//   MiniBag: ({ onClose, miniBagRef }) => (
//     <div ref={miniBagRef} onClick={onClose}>
//       MiniBag Component
//     </div>
//   ),
// }));
// jest.mock("../JewelrySuggestion/JewelrySuggestion", () => ({
//   JewelrySuggestion: ({ jewelryId }) => (
//     <div>JewelrySuggestion Component for ID: {jewelryId}</div>
//   ),
// }));
// jest.mock("../HorizontalLine/HorizontalLine", () => ({
//   HorizontalLine: () => <div>HorizontalLine Component</div>,
// }));

// describe("JewelryItem component", () => {
//   const mockJewelryService = {
//     findOne: jest.fn(),
//   };
//   const mockWishlistContext = {
//     onAddToWishlistClick: jest.fn(),
//     onRemoveFromWishlistClick: jest.fn(),
//   };
//   const mockBagContext = {
//     onAddToBagClick: jest.fn(),
//   };

//   beforeEach(() => {
//     useParams.mockReturnValue({ _id: "123" });
//     useService.mockReturnValue(mockJewelryService);
//     useWishlistContext.mockReturnValue(mockWishlistContext);
//     useBagContext.mockReturnValue(mockBagContext);
//     jest.clearAllMocks();
//   });

//   test("renders jewelry item details after loading", async () => {
//     // Mock data for the jewelry item
//     const mockJewelryData = {
//       _id: "123",
//       title: "Test Jewelry",
//       firstImageUrl: "test-image-1.jpg",
//       secondImageUrl: "test-image-2.jpg",
//       isSoldOut: false,
//       price: 100,
//       isLikedByUser: false,
//       category: 1,
//       sizes: [{ _id: 1, measurement: "6.98", available: true }],
//     };

//     // Mock the findOne method to resolve with mock data
//     mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

//     // Render the component with Router for useParams to work
//     render(
//       <Router>
//         <JewelryItem />
//       </Router>
//     );

//     // Use waitFor to ensure async operations are complete
//     await waitFor(() => {
//       expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
//       expect(screen.getByTestId("jewelry-title")).toHaveTextContent(
//         "Test Jewelry"
//       );

//       expect(screen.getByTestId("first-image-url")).toBeInTheDocument();
//       expect(screen.getByTestId("first-image-url")).toHaveAttribute(
//         "src",
//         "test-image-1.jpg"
//       );

//       expect(screen.getByTestId("size-1")).toBeInTheDocument();
//       expect(screen.getByTestId("size-label-1")).toHaveTextContent(
//         "6.98"
//       );
//     });

//     test("renders second image after clicking on first image", async () => {
//         // Mock data for the jewelry item
//         const mockJewelryData = {
//           _id: "123",
//           title: "Test Jewelry",
//           firstImageUrl: "test-image-1.jpg",
//           secondImageUrl: "test-image-2.jpg",
//           isSoldOut: false,
//           price: 100,
//           isLikedByUser: false,
//           category: 1,
//           sizes: [{ _id: 1, measurement: "6.98", available: true }],
//         };

//         // Mock the findOne method to resolve with mock data
//         mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

//         // Render the component with Router for useParams to work
//         render(
//           <Router>
//             <JewelryItem />
//           </Router>
//         );

//         // Wait for the component to finish rendering with mock data
//         await waitFor(() => {
//           expect(screen.getByTestId("first-image-url")).toBeInTheDocument();
//         });

//         // Find and click the first image element
//         const firstImage = screen.getByTestId("first-image-url");
//         fireEvent.click(firstImage);

//         // Wait for the second image to appear in the DOM
//         await waitFor(() => {
//             expect(screen.getByTestId("second-image-url")).toBeInTheDocument();
//             expect(screen.getByTestId("second-image-url")).toHaveAttribute(
//               "src",
//               "test-image-2.jpg"
//             );
//         });
//       });
//   });
// });

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { JewelryItem } from "./JewelryItem";
import { useService } from "../../hooks/useService";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { useBagContext } from "../../contexts/BagContext";

// Mocking the dependencies
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));
jest.mock("../../hooks/useService");
jest.mock("../../contexts/WishlistContext");
jest.mock("../../contexts/BagContext");
jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));
jest.mock("../Bag/MiniBag/MiniBag", () => ({
  MiniBag: ({ onClose, miniBagRef }) => (
    <div ref={miniBagRef} onClick={onClose}>
      MiniBag Component
    </div>
  ),
}));
jest.mock("../JewelrySuggestion/JewelrySuggestion", () => ({
  JewelrySuggestion: ({ jewelryId }) => (
    <div>JewelrySuggestion Component for ID: {jewelryId}</div>
  ),
}));
jest.mock("../HorizontalLine/HorizontalLine", () => ({
  HorizontalLine: () => <div>HorizontalLine Component</div>,
}));

describe("JewelryItem component", () => {
  const mockJewelryService = {
    findOne: jest.fn(),
  };
  const mockWishlistContext = {
    onAddToWishlistClick: jest.fn(),
    onRemoveFromWishlistClick: jest.fn(),
  };
  const mockBagContext = {
    onAddToBagClick: jest.fn(),
  };

  beforeEach(() => {
    useParams.mockReturnValue({ _id: "123" });
    useService.mockReturnValue(mockJewelryService);
    useWishlistContext.mockReturnValue(mockWishlistContext);
    useBagContext.mockReturnValue(mockBagContext);
    jest.clearAllMocks();
  });

  test("renders jewelry item details after loading", async () => {
    // Mock data for the jewelry item
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      secondImageUrl: "test-image-2.jpg",
      isSoldOut: false,
      price: 100,
      isLikedByUser: false,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    // Mock the findOne method to resolve with mock data
    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    // Render the component with Router for useParams to work
    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    // Use waitFor to ensure async operations are complete
    await waitFor(() => {
      expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
      expect(screen.getByTestId("jewelry-title")).toHaveTextContent(
        "Test Jewelry"
      );

      expect(screen.getByTestId("first-image-url")).toBeInTheDocument();
      expect(screen.getByTestId("first-image-url")).toHaveAttribute(
        "src",
        "test-image-1.jpg"
      );

      expect(screen.getByTestId("size-1")).toBeInTheDocument();
      expect(screen.getByTestId("size-label-1")).toHaveTextContent("6.98");
    });
  });

  test("renders second image after clicking on first image", async () => {
    // Mock data for the jewelry item
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      secondImageUrl: "test-image-2.jpg",
      isSoldOut: false,
      price: 100,
      isLikedByUser: false,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    // Mock the findOne method to resolve with mock data
    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    // Render the component with Router for useParams to work
    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    // Wait for the component to finish rendering with mock data
    await waitFor(() => {
      expect(screen.getByTestId("first-image-url")).toBeInTheDocument();
    });

    // Find and click the first image element
    const firstImage = screen.getByTestId("first-image-url");
    fireEvent.click(firstImage);

    // Wait for the second image to appear in the DOM
    await waitFor(() => {
      expect(screen.getByTestId("second-image-url")).toBeInTheDocument();
      expect(screen.getByTestId("second-image-url")).toHaveAttribute(
        "src",
        "test-image-2.jpg"
      );
    });
  });
});
